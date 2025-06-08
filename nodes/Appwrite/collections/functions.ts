import { type Client, Databases, type Models, ID } from 'node-appwrite';

async function getDatabaseService(client: Client): Promise<Databases> {
	return new Databases(client);
}

export async function createCollection(
	client: Client,
	databaseId: string,
	collectionId: string,
	name: string,
	permissions: string[],
	documentSecurity: boolean,
): Promise<Models.Collection> {
	const databases = await getDatabaseService(client);
	let finalCollectionId = collectionId;
	if (collectionId.toLowerCase() === 'unique()') {
		finalCollectionId = ID.unique();
	}
	return databases.createCollection(databaseId, finalCollectionId, name, permissions, documentSecurity);
}

export async function getCollection(
	client: Client,
	databaseId: string,
	collectionId: string,
): Promise<Models.Collection> {
	const databases = await getDatabaseService(client);
	return databases.getCollection(databaseId, collectionId);
}

export async function listCollections(
	client: Client,
	databaseId: string,
): Promise<Models.CollectionList> {
	const databases = await getDatabaseService(client);
	return databases.listCollections(databaseId);
}

export async function updateCollection(
	client: Client,
	databaseId: string,
	collectionId: string,
	name: string,
	permissions: string[],
): Promise<Models.Collection> {
	const databases = await getDatabaseService(client);
	return databases.updateCollection(databaseId, collectionId, name, permissions);
}

export async function deleteCollection(
	client: Client,
	databaseId: string,
	collectionId: string,
): Promise<void> {
	const databases = await getDatabaseService(client);
	await databases.deleteCollection(databaseId, collectionId);
}
