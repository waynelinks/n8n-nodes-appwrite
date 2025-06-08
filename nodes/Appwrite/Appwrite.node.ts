import {
	type IDataObject,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type JsonObject,
	NodeApiError,
	NodeConnectionType,
} from "n8n-workflow";

import type { IndexType, Runtime } from "node-appwrite";
import { getAppwriteClient } from "./appwriteClient";

// Import Operations and Fields for every resource
import { databaseOperations, databaseFields } from "./database";
import { collectionOperations, collectionFields } from "./collections";
import { documentOperations, documentFields } from "./documents";
import { indexOperations, indexFields } from "./indexes";
import { functionOperations, functionFields } from "./functions";
import { storageOperations, storageFields } from "./storage";
import { userOperations, userFields } from "./users";

// Import all SDK function wrappers
import * as db from "./database/functions";
import * as col from "./collections/functions";
import * as doc from "./documents/functions";
import * as idx from "./indexes/functions";
import * as func from "./functions/functions";
import * as storage from "./storage/functions";
import * as user from "./users/functions";

// Define a type for Appwrite's specific error response for safer access
interface AppwriteErrorResponse {
	message: string;
	code: number;
	type: string;
	version: string;
}

export class Appwrite implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Appwrite",
		name: "appwrite",
		icon: "file:Appwrite.svg",
		group: ["transform"],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: "A comprehensive node for the Appwrite API",
		defaults: {
			name: "Appwrite",
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: "appwriteApi",
				required: true,
			},
		],
		properties: [
			{
				displayName: "Resource",
				name: "resource",
				noDataExpression: true,
				type: "options",
				options: [
					{ name: "User", description: "Manage users", value: "user" },
					{
						name: "Database",
						description: "Manage databases",
						value: "database",
					},
					{
						name: "Collection",
						description: "Manage collections",
						value: "collection",
					},
					{
						name: "Document",
						description: "Manage documents",
						value: "document",
					},
					{ name: "Index", description: "Manage indexes", value: "index" },
					{
						name: "Function",
						description: "Manage functions",
						value: "function",
					},
					{ name: "Storage", description: "Manage storage", value: "storage" },
				],
				default: "document",
			},

			// Spread all imported operations and fields
			...databaseOperations,
			...databaseFields,
			...collectionOperations,
			...collectionFields,
			...documentOperations,
			...documentFields,
			...indexOperations,
			...indexFields,
			...functionOperations,
			...functionFields,
			...storageOperations,
			...storageFields,
			...userOperations,
			...userFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];
		const binaryData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter("resource", 0) as string;
		const operation = this.getNodeParameter("operation", 0) as string;

		const credentials = await this.getCredentials("appwriteApi");
		const client = getAppwriteClient(credentials);

		try {
			let responseData: IDataObject | IDataObject[] = {};

			// ROUTE BY RESOURCE
			if (resource === "database") {
				const databaseId = this.getNodeParameter("databaseId", 0, "") as string;
				if (operation === "create") {
					const name = this.getNodeParameter("name", 0) as string;
					responseData = await db.createDatabase(client, databaseId, name);
				} else if (operation === "get") {
					responseData = await db.getDatabase(client, databaseId);
				} else if (operation === "list") {
					responseData = await db.listDatabases(client);
				} else if (operation === "update") {
					const name = this.getNodeParameter("name", 0) as string;
					responseData = await db.updateDatabase(client, databaseId, name);
				} else if (operation === "delete") {
					await db.deleteDatabase(client, databaseId);
					responseData = { success: true };
				}
			} else if (resource === "collection") {
				const databaseId = this.getNodeParameter("databaseId", 0) as string;
				const collectionId = this.getNodeParameter(
					"collectionId",
					0,
					"",
				) as string;
				if (operation === "create") {
					const name = this.getNodeParameter("name", 0) as string;
					const permissions = JSON.parse(
						this.getNodeParameter("permissions", 0, "[]") as string,
					) as string[];
					const documentSecurity = this.getNodeParameter(
						"documentSecurity",
						0,
					) as boolean;
					responseData = await col.createCollection(
						client,
						databaseId,
						collectionId,
						name,
						permissions,
						documentSecurity,
					);
				} else if (operation === "get") {
					responseData = await col.getCollection(
						client,
						databaseId,
						collectionId,
					);
				} else if (operation === "list") {
					responseData = await col.listCollections(client, databaseId);
				} else if (operation === "update") {
					const name = this.getNodeParameter("name", 0) as string;
					const permissions = JSON.parse(
						this.getNodeParameter("permissions", 0, "[]") as string,
					) as string[];
					responseData = await col.updateCollection(
						client,
						databaseId,
						collectionId,
						name,
						permissions,
					);
				} else if (operation === "delete") {
					await col.deleteCollection(client, databaseId, collectionId);
					responseData = { success: true };
				}
			} else if (resource === "document") {
				const databaseId = this.getNodeParameter("databaseId", 0) as string;
				const collectionId = this.getNodeParameter("collectionId", 0) as string;
				const documentId = this.getNodeParameter("documentId", 0, "") as string;
				if (operation === "create") {
					const data = JSON.parse(
						this.getNodeParameter("data", 0, "{}") as string,
					) as object;
					responseData = await doc.createDocument(
						client,
						databaseId,
						collectionId,
						documentId,
						data,
					);
				} else if (operation === "get") {
					responseData = await doc.getDocument(
						client,
						databaseId,
						collectionId,
						documentId,
					);
				} else if (operation === "list") {
					const queries = JSON.parse(
						this.getNodeParameter("queries", 0, "[]") as string,
					) as string[];
					responseData = await doc.listDocuments(
						client,
						databaseId,
						collectionId,
						queries,
					);
				} else if (operation === "update") {
					const data = JSON.parse(
						this.getNodeParameter("data", 0, "{}") as string,
					) as object;
					responseData = await doc.updateDocument(
						client,
						databaseId,
						collectionId,
						documentId,
						data,
					);
				} else if (operation === "delete") {
					await doc.deleteDocument(
						client,
						databaseId,
						collectionId,
						documentId,
					);
					responseData = { success: true };
				}
			} else if (resource === "index") {
				const databaseId = this.getNodeParameter("databaseId", 0) as string;
				const collectionId = this.getNodeParameter("collectionId", 0) as string;
				const key = this.getNodeParameter("key", 0) as string;
				if (operation === "create") {
					const type = this.getNodeParameter("type", 0) as IndexType;
					const attributes = JSON.parse(
						this.getNodeParameter("attributes", 0, "[]") as string,
					) as string[];
					const orders = JSON.parse(
						this.getNodeParameter("orders", 0, "[]") as string,
					) as string[];
					responseData = await idx.createIndex(
						client,
						databaseId,
						collectionId,
						key,
						type,
						attributes,
						orders,
					);
				} else if (operation === "get") {
					responseData = await idx.getIndex(
						client,
						databaseId,
						collectionId,
						key,
					);
				} else if (operation === "list") {
					responseData = await idx.listIndexes(
						client,
						databaseId,
						collectionId,
					);
				} else if (operation === "delete") {
					await idx.deleteIndex(client, databaseId, collectionId, key);
					responseData = { success: true };
				}
			} else if (resource === "function") {
				const functionId = this.getNodeParameter("functionId", 0, "") as string;
				if (operation === "create") {
					const name = this.getNodeParameter("name", 0) as string;
					const runtime = this.getNodeParameter("runtime", 0) as string;
					const execute = JSON.parse(
						this.getNodeParameter("execute", 0, "[]") as string,
					) as string[];
					responseData = await func.createFunction(
						client,
						functionId,
						name,
						runtime as Runtime,
						execute,
					);
				} else if (operation === "get") {
					responseData = await func.getFunction(client, functionId);
				} else if (operation === "list") {
					responseData = await func.listFunctions(client);
				} else if (operation === "delete") {
					await func.deleteFunction(client, functionId);
					responseData = { success: true };
				} else if (operation === "createExecution") {
					const data = this.getNodeParameter("data", 0) as string;
					const async = this.getNodeParameter("async", 0) as boolean;
					responseData = await func.createExecution(
						client,
						functionId,
						data,
						async,
					);
				} else if (operation === "getExecution") {
					const executionId = this.getNodeParameter("executionId", 0) as string;
					responseData = await func.getExecution(
						client,
						functionId,
						executionId,
					);
				} else if (operation === "listExecutions") {
					responseData = await func.listExecutions(client, functionId);
				}
			} else if (resource === "storage") {
				const bucketId = this.getNodeParameter("bucketId", 0) as string;
				if (operation === "listBuckets") {
					responseData = await storage.listBuckets(client);
				} else if (operation === "createBucket") {
					const name = this.getNodeParameter("name", 0) as string;
					const permissions = JSON.parse(
						this.getNodeParameter("permissions", 0, "[]") as string,
					) as string[];
					responseData = await storage.createBucket(
						client,
						bucketId,
						name,
						permissions,
					);
				} else if (operation === "getBucket") {
					responseData = await storage.getBucket(client, bucketId);
				} else if (operation === "deleteBucket") {
					await storage.deleteBucket(client, bucketId);
					responseData = { success: true };
				} else if (operation === "listFiles") {
					responseData = await storage.listFiles(client, bucketId);
				} else if (operation === "createFile") {
					const binaryPropertyName = this.getNodeParameter(
						"binaryPropertyName",
						0,
					) as string;
					const fileMetadata = this.helpers.assertBinaryData(
						0,
						binaryPropertyName,
					);
					const binary = await this.helpers.getBinaryDataBuffer(
						0,
						binaryPropertyName,
					);
					responseData = await storage.createFile(
						client,
						bucketId,
						"unique()",
						binary,
						fileMetadata.fileName || "unnamed",
					);
				} else if (operation === "getFile") {
					const fileId = this.getNodeParameter("fileId", 0) as string;
					responseData = await storage.getFile(client, bucketId, fileId);
				} else if (operation === "downloadFile") {
					const fileId = this.getNodeParameter("fileId", 0) as string;
					const fileData = await storage.getFileDownload(
						client,
						bucketId,
						fileId,
					);
					const binaryObject = await this.helpers.prepareBinaryData(
						fileData,
						fileId,
					);
					binaryData.push({
						json: {},
						binary: { data: binaryObject },
					});
					responseData = {
						success: true,
						message: `File ${fileId} prepared for download.`,
					};
				} else if (operation === "deleteFile") {
					const fileId = this.getNodeParameter("fileId", 0) as string;
					await storage.deleteFile(client, bucketId, fileId);
					responseData = { success: true };
				}
				// ... inside the 'execute' method
			} else if (resource === "user") {
				const userId = this.getNodeParameter("userId", 0, "unique()") as string;

				if (operation === "create") {
					const createFields = this.getNodeParameter("createFields", 0, {}) as {
						name?: string;
						email?: string;
						password?: string;
						phone?: string;
					};
					responseData = await user.createUser(
						client,
						userId,
						createFields.name,
						createFields.email,
						createFields.password,
						createFields.phone, // Assuming you add phone to your createUser function
					);
				} else if (operation === "list") {
					const queries = JSON.parse(
						this.getNodeParameter("queries", 0, "[]") as string,
					) as string[];
					responseData = await user.listUsers(client, queries);
				} else if (operation === "get") {
					responseData = await user.getUser(client, userId);
				} else if (operation === "update") {
					const updateFields = this.getNodeParameter("updateFields", 0, {}) as {
						name?: string;
						email?: string;
						password?: string;
						phone?: string;
						status?: boolean;
						prefs?: string; // Prefs come in as a JSON string
					};

					const updates = {
						...updateFields,
						prefs: updateFields.prefs
							? JSON.parse(updateFields.prefs)
							: undefined,
					};

					responseData = await user.updateUser(client, userId, updates);
				} else if (operation === "delete") {
					await user.deleteUser(client, userId);
					responseData = { success: true };
				} else if (operation === "getPrefs") {
					responseData = await user.getUserPrefs(client, userId);
				} else if (operation === "listSessions") {
					responseData = await user.listUserSessions(client, userId);
				} else if (operation === "deleteSession") {
					const sessionId = this.getNodeParameter("sessionId", 0) as string;
					await user.deleteUserSession(client, userId, sessionId);
					responseData = { success: true };
				} else if (operation === "deleteSessions") {
					await user.deleteUserSessions(client, userId);
					responseData = { success: true };
				} else if (operation === "listLogs") {
					responseData = await user.listUserLogs(client, userId);
				} else if (operation === "listMemberships") {
					responseData = await user.listUserMemberships(client, userId);
				}
			}
			// ...

			if (Array.isArray(responseData)) {
				returnData.push(...responseData);
			} else if (Object.keys(responseData).length > 0) {
				returnData.push(responseData);
			}
		} catch (error: unknown) {
			if (this.continueOnFail()) {
				const json: IDataObject = { error: "An unknown error occurred." };
				if (error instanceof Error) {
					json.error = error.message;
					if ("response" in error) {
						const response = (error as { response: AppwriteErrorResponse })
							.response;
						if (response && typeof response === "object") {
							json.details = response as unknown as JsonObject;
						}
					}
				}
				return [this.helpers.returnJsonArray([{ json }])];
			}

			if (error instanceof Error) {
				const errorObject: JsonObject = {
					message: error.message,
					name: error.name,
				};
				if (error.stack) errorObject.stack = error.stack;
				if ("response" in error) {
					const response = (error as { response: AppwriteErrorResponse })
						.response;
					if (response && typeof response === "object") {
						errorObject.appwriteResponse = response as unknown as JsonObject;
					}
				}
				throw new NodeApiError(this.getNode(), errorObject);
			}
			throw new NodeApiError(this.getNode(), { message: String(error) });
		}

		if (binaryData.length > 0) {
			return [binaryData];
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
