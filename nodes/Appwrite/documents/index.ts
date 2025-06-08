import type { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new document',
				action: 'Create a document',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a document by ID',
				action: 'Get a document',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a document by ID',
				action: 'Update a document',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a document by ID',
				action: 'Delete a document',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all documents in a collection',
				action: 'List documents',
			},
		],
		default: 'list',
	},
];

export const documentFields: INodeProperties[] = [
	{
		displayName: 'Database ID',
		name: 'databaseId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the database containing the collection',
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
	},
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the collection containing the document',
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
	},
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		default: 'unique()',
		description: 'Document unique ID. Use "unique()" to auto-generate for creation.',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'get', 'update', 'delete'],
			},
		},
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		default: '{}',
		description: 'Document data as a JSON object',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Queries',
		name: 'queries',
		type: 'json',
		typeOptions: {
			rows: 5,
		},
		default: '[]',
		description:
			'Array of queries to filter results. E.g. [\\"equal(\\"title\\", [\\"Post 1\\"])\\"]',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['list'],
			},
		},
	},
];
