import type { INodeProperties } from 'n8n-workflow';

export const storageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['storage'],
			},
		},
		options: [
			// --- Bucket Operations ---
			{
				name: 'List Buckets',
				value: 'listBuckets',
				action: 'List all storage buckets',
				description: 'Returns a list of all buckets in your project',
			},
			{
				name: 'Create Bucket',
				value: 'createBucket',
				action: 'Create a storage bucket',
				description: 'Creates a new storage bucket',
			},
			{
				name: 'Get Bucket',
				value: 'getBucket',
				action: 'Get a storage bucket',
				description: 'Gets a storage bucket by its ID',
			},
			{
				name: 'Delete Bucket',
				value: 'deleteBucket',
				action: 'Delete a storage bucket',
				description: 'Deletes a storage bucket by its ID',
			},
			// --- File Operations ---
			{
				name: 'List Files',
				value: 'listFiles',
				action: 'List files in a bucket',
				description: 'Returns a list of all files in a specific bucket',
			},
			{
				name: 'Upload File',
				value: 'createFile',
				action: 'Upload a file',
				description: 'Uploads a binary file to a bucket',
			},
			{
				name: 'Get File',
				value: 'getFile',
				action: 'Get a file',
				description: "Gets a file's metadata by its ID",
			},
			{
				name: 'Download File',
				value: 'downloadFile',
				action: 'Download a file',
				description: "Downloads a file's binary content",
			},
			{
				name: 'Delete File',
				value: 'deleteFile',
				action: 'Delete a file',
				description: 'Deletes a file by its ID',
			},
		],
		default: 'listBuckets',
	},
];

export const storageFields: INodeProperties[] = [
	// --- Bucket Fields ---
	{
		displayName: 'Bucket ID',
		name: 'bucketId',
		type: 'string',
		required: true,
		default: 'unique()',
		description:
			'Unique ID for the bucket. Use "unique()" to auto-generate for creation. Required for all file operations.',
		displayOptions: {
			show: {
				resource: ['storage'],
				operation: [
					'createBucket',
					'getBucket',
					'deleteBucket',
					'listFiles',
					'createFile',
					'getFile',
					'downloadFile',
					'deleteFile',
				],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'A name for the new bucket',
		displayOptions: {
			show: {
				resource: ['storage'],
				operation: ['createBucket'],
			},
		},
	},
	{
		displayName: 'Permissions',
		name: 'permissions',
		type: 'json',
		default: '[]',
		description: 'An array of role strings that have access. E.g. ["role:all"]',
		displayOptions: {
			show: {
				resource: ['storage'],
				operation: ['createBucket'],
			},
		},
	},

	// --- File Fields ---
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID of the file',
		displayOptions: {
			show: {
				resource: ['storage'],
				operation: ['getFile', 'downloadFile', 'deleteFile'],
			},
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		description:
			'The name of the binary property on the n8n item which contains the file to upload.',
		displayOptions: {
			show: {
				resource: ['storage'],
				operation: ['createFile'],
			},
		},
	},
];
