import { type Client, Databases, type Models, ID } from 'node-appwrite';

async function getDatabaseService(client: Client): Promise<Databases> {
	return new Databases(client);
}

export async function createDocument(
	client: Client,
	databaseId: string,
	collectionId: string,
	documentId: string,
	data: object,
): Promise<Models.Document> {
	const databases = await getDatabaseService(client);
	let newDocumentId = documentId;
	if (documentId.toLowerCase() === 'unique()') {
		newDocumentId = ID.unique();
	}
	return databases.createDocument(databaseId, collectionId, newDocumentId, data);
}

export async function getDocument(
	client: Client,
	databaseId: string,
	collectionId: string,
	documentId: string,
): Promise<Models.Document> {
	const databases = await getDatabaseService(client);
	return databases.getDocument(databaseId, collectionId, documentId);
}

export async function listDocuments(
	client: Client,
	databaseId: string,
	collectionId: string,
	queries?: string[],
): Promise<Models.DocumentList<Models.Document>> {
	const databases = await getDatabaseService(client);
	return databases.listDocuments(databaseId, collectionId, queries);
}

export async function updateDocument(
	client: Client,
	databaseId: string,
	collectionId: string,
	documentId: string,
	data: object,
): Promise<Models.Document> {
	const databases = await getDatabaseService(client);
	return databases.updateDocument(databaseId, collectionId, documentId, data);
}

export async function deleteDocument(
	client: Client,
	databaseId: string,
	collectionId: string,
	documentId: string,
): Promise<void> {
	const databases = await getDatabaseService(client);
	await databases.deleteDocument(databaseId, collectionId, documentId);
}
