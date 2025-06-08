import { type Client, Databases, type Models, type IndexType } from 'node-appwrite';

async function getDatabaseService(client: Client): Promise<Databases> {
	return new Databases(client);
}

export async function createIndex(
	client: Client,
	databaseId: string,
	collectionId: string,
	key: string,
	type: IndexType,
	attributes: string[],
	orders?: string[],
): Promise<Models.Index> {
	const databases = await getDatabaseService(client);
	return databases.createIndex(databaseId, collectionId, key, type, attributes, orders);
}

export async function getIndex(
	client: Client,
	databaseId: string,
	collectionId: string,
	key: string,
): Promise<Models.Index> {
	const databases = await getDatabaseService(client);
	return databases.getIndex(databaseId, collectionId, key);
}

export async function listIndexes(
	client: Client,
	databaseId: string,
	collectionId: string,
): Promise<Models.IndexList> {
	const databases = await getDatabaseService(client);
	return databases.listIndexes(databaseId, collectionId);
}

export async function deleteIndex(
	client: Client,
	databaseId: string,
	collectionId: string,
	key: string,
): Promise<void> {
	const databases = await getDatabaseService(client);
	await databases.deleteIndex(databaseId, collectionId, key);
}
