import { Client } from 'node-appwrite';
import type { ICredentialDataDecryptedObject } from 'n8n-workflow';

export function getAppwriteClient(credentials: ICredentialDataDecryptedObject): Client {
	const endpoint = credentials.endpoint as string;
	const projectId = credentials.projectId as string;
	const apiKey = credentials.apiKey as string;

	const client = new Client();

	if (!endpoint || !projectId || !apiKey) {
		// This should not happen if credentials are required and validated, but it's a good safeguard.
		throw new Error('Missing endpoint, projectId, or apiKey in credentials.');
	}

	client.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

	return client;
}
