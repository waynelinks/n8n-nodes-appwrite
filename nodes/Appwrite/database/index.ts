import type { INodeProperties } from 'n8n-workflow';

export const databaseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['database'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new database',
				action: 'Create a database',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a database by ID',
				action: 'Get a database',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a database by ID',
				action: 'Update a database',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a database by ID',
				action: 'Delete a database',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all databases',
				action: 'List databases',
			},
		],
		default: 'list',
	},
];

export const databaseFields: INodeProperties[] = [
	{
		displayName: 'Database ID',
		name: 'databaseId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique ID for the database. Use "unique()" to auto-generate for creation.',
		displayOptions: {
			show: {
				resource: ['database'],
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
		description: 'The name of the database.',
		displayOptions: {
			show: {
				resource: ['database'],
				operation: ['create', 'update'],
			},
		},
	},
];
