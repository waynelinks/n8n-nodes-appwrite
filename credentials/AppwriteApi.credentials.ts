import type {
	IAuthenticate,
	Icon,
	ICredentialType,
	INodeProperties,
} from "n8n-workflow";

export class AppwriteApi implements ICredentialType {
		name = "appwriteApi";
		displayName = "Appwrite API";
		documentationUrl = "https://appwrite.io/docs";
		icon?: Icon | undefined = "file:../nodes/Appwrite/Appwrite.svg";
		properties: INodeProperties[] = [
			{
				displayName: "Appwrite API Endpoint",
				name: "endpoint", // CORRECTED
				type: "string",
				default: "",
				placeholder: "https://cloud.appwrite.io/v1",
				description:
					"The base endpoint of your Appwrite API, e.g., https://cloud.appwrite.io/v1",
			},
			{
				displayName: "Project ID",
				name: "projectId",
				description: "The ID of the Appwrite project you want to connect to.",
				type: "string",
				default: "",
			},
			{
				displayName: "API Key",
				name: "apiKey",
				description:
					"Your Appwrite API key. Make sure it has the necessary permissions for the operations you want to perform.",
				type: "string",
				typeOptions: { password: true },
				default: "",
			},
		];

		authenticate: IAuthenticate = {
			type: "generic",
			properties: {
				headers: {
					"X-Appwrite-Project": "={{$credentials.projectId}}",
					"X-Appwrite-Key": "={{$credentials.apiKey}}",
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			},
		};

		test = {
			request: {
				// The baseURL should NOT include /v1
				baseURL: "={{$credentials.endpoint}}",
				// The version prefix is added here
				url: "/databases",
			},
		};
	}
