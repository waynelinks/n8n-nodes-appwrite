import { type Client, Storage, type Models, ID } from 'node-appwrite';
import type { BinaryLike } from 'node:crypto';

async function getStorageService(client: Client): Promise<Storage> {
	return new Storage(client);
}

// --- Bucket Functions ---

export async function createBucket(
	client: Client,
	bucketId: string,
	name: string,
	permissions?: string[],
): Promise<Models.Bucket> {
	const storage = await getStorageService(client);
	const finalBucketId = bucketId.toLowerCase() === 'unique()' ? ID.unique() : bucketId;
	return storage.createBucket(finalBucketId, name, permissions);
}

export async function getBucket(client: Client, bucketId: string): Promise<Models.Bucket> {
	const storage = await getStorageService(client);
	return storage.getBucket(bucketId);
}

export async function listBuckets(client: Client): Promise<Models.BucketList> {
	const storage = await getStorageService(client);
	return storage.listBuckets();
}

export async function deleteBucket(client: Client, bucketId: string): Promise<void> {
	const storage = await getStorageService(client);
	await storage.deleteBucket(bucketId);
}

// --- File Functions ---

export async function createFile(
	client: Client,
	bucketId: string,
	fileId: string,
	fileBuffer: Buffer,
	fileName: string,
): Promise<Models.File> {
	const storage = await getStorageService(client);
	const file = InputFile.fromBuffer(fileBuffer, fileName);
	const finalFileId = fileId.toLowerCase() === 'unique()' ? ID.unique() : fileId;
	return storage.createFile(bucketId, finalFileId, file);
}

export async function listFiles(client: Client, bucketId: string): Promise<Models.FileList> {
	const storage = await getStorageService(client);
	return storage.listFiles(bucketId);
}

export async function getFile(
	client: Client,
	bucketId: string,
	fileId: string,
): Promise<Models.File> {
	const storage = await getStorageService(client);
	return storage.getFile(bucketId, fileId);
}

export async function getFileDownload(
	client: Client,
	bucketId: string,
	fileId: string,
): Promise<Buffer> {
	const storage = await getStorageService(client);
	const result = await storage.getFileDownload(bucketId, fileId);
	return Buffer.from(result); // Ensure result is a Buffer
}

export async function deleteFile(client: Client, bucketId: string, fileId: string): Promise<void> {
	const storage = await getStorageService(client);
	await storage.deleteFile(bucketId, fileId);
}

declare namespace InputFile {
		function fromBuffer(parts: Blob | BinaryLike, name: string): File;
		function fromPath(path: string, name: string): File;
		function fromPlainText(content: string, name: string): File;
}

export { InputFile };
