import type { INodeProperties } from 'n8n-workflow';

export const indexOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['index'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new index',
				description: 'Creates a new index on a collection',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an index',
				description: 'Deletes an index from a collection by its key',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an index',
				description: 'Retrieves an index by its key',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List indexes',
				description: 'Lists all indexes on a collection',
			},
		],
		default: 'list',
	},
];

export const indexFields: INodeProperties[] = [
	{
		displayName: 'Database ID',
		name: 'databaseId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the database containing the collection',
		displayOptions: {
			show: {
				resource: ['index'],
			},
		},
	},
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the collection to manage indexes on',
		displayOptions: {
			show: {
				resource: ['index'],
			},
		},
	},
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		required: true,
		default: '',
		description: 'A unique key for the index',
		displayOptions: {
			show: {
				resource: ['index'],
				operation: ['create', 'get', 'delete'],
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		default: 'key',
		description: 'The type of index',
		options: [
			{
				name: 'Key',
				value: 'key',
				description: 'A standard index for sorting and filtering',
			},
			{
				name: 'Full-text',
				value: 'Full-text',
				description: 'An index for searching within string attributes',
			},
			{
				name: 'Unique',
				value: 'unique',
				description: 'An index that enforces unique values for the attributes',
			},
		],
		displayOptions: {
			show: {
				resource: ['index'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'json',
		required: true,
		default: '[]',
		description: 'An array of attribute keys to index. E.g., ["name", "email"]',
		displayOptions: {
			show: {
				resource: ['index'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Orders',
		name: 'orders',
		type: 'json',
		default: '[]',
		description:
			'Array of ordering directions (ASC or DESC). Only for "Key" type indexes. E.g., ["ASC"]',
		displayOptions: {
			show: {
				resource: ['index'],
				operation: ['create'],
				type: ['key'],
			},
		},
	},
];
