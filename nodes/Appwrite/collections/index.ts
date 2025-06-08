import type { INodeProperties } from 'n8n-workflow';

export const collectionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['collection'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new collection',
				action: 'Create a collection',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a collection by ID',
				action: 'Get a collection',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a collection by ID',
				action: 'Update a collection',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a collection by ID',
				action: 'Delete a collection',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all collections in a database',
				action: 'List collections',
			},
		],
		default: 'list',
	},
];

export const collectionFields: INodeProperties[] = [
	{
		displayName: 'Database ID',
		name: 'databaseId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the database to perform the action in',
		displayOptions: {
			show: {
				resource: ['collection'],
			},
		},
	},
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		default: 'unique()',
		description: 'The unique ID for the collection. Use "unique()" to auto-generate for creation.',
		displayOptions: {
			show: {
				resource: ['collection'],
				operation: ['create', 'get', 'update', 'delete'],
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'The name of the collection',
		displayOptions: {
			show: {
				resource: ['collection'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Permissions',
		name: 'permissions',
		type: 'json',
		default: '[]',
		description: 'An array of permission strings. E.g., ["read(\\"any\\")"]',
		displayOptions: {
			show: {
				resource: ['collection'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Enable Document Security',
		name: 'documentSecurity',
		type: 'boolean',
		default: false,
		description: "Whether to enable Appwrite's document-level security. This is a one-way street.",
		displayOptions: {
			show: {
				resource: ['collection'],
				operation: ['create'],
			},
		},
	},
];
