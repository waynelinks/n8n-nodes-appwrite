import { type Client, Databases, type Models, ID } from 'node-appwrite';

async function getDatabaseService(client: Client): Promise<Databases> {
	return new Databases(client);
}

export async function createDatabase(
	client: Client,
	databaseId: string,
	name: string,
): Promise<Models.Database> {
	const databases = await getDatabaseService(client);
	let newDatabaseId = databaseId;
	if (newDatabaseId.toLowerCase() === 'unique()') {
		newDatabaseId = ID.unique();
	}
	return databases.create(newDatabaseId, name);
}

export async function getDatabase(client: Client, databaseId: string): Promise<Models.Database> {
	const databases = await getDatabaseService(client);
	return databases.get(databaseId);
}

export async function listDatabases(client: Client): Promise<Models.DatabaseList> {
	const databases = await getDatabaseService(client);
	return databases.list();
}

export async function updateDatabase(
	client: Client,
	databaseId: string,
	name: string,
): Promise<Models.Database> {
	const databases = await getDatabaseService(client);
	return databases.update(databaseId, name);
}

export async function deleteDatabase(client: Client, databaseId: string): Promise<void> {
	const databases = await getDatabaseService(client);
	await databases.delete(databaseId);
}
