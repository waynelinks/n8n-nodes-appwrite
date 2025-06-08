import type { INodeProperties } from 'n8n-workflow';

export const functionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['function'],
			},
		},
		options: [
			// --- Function Management ---
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new function',
				description: 'Creates a new serverless function',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a function',
				description: 'Permanently deletes a function',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a function',
				description: 'Retrieves a function by its ID',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List functions',
				description: 'Lists all functions in the project',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a function',
				description: 'Updates the settings of an existing function',
			},
			// --- Execution Management ---
			{
				name: 'Create Execution',
				value: 'createExecution',
				action: 'Create an execution',
				description: 'Executes a function and returns the result',
			},
			{
				name: 'Get Execution',
				value: 'getExecution',
				action: 'Get an execution',
				description: 'Gets the details of a specific past execution',
			},
			{
				name: 'List Executions',
				value: 'listExecutions',
				action: 'List executions',
				description: 'Lists all executions for a specific function',
			},
		],
		default: 'list',
	},
];

export const functionFields: INodeProperties[] = [
	// --- Common Fields ---
	{
		displayName: 'Function ID',
		name: 'functionId',
		type: 'string',
		required: true,
		default: 'unique()',
		description: 'Unique ID for the function. Use "unique()" to auto-generate for creation.',
		displayOptions: {
			show: {
				resource: ['function'],
				operation: [
					'create',
					'delete',
					'get',
					'update',
					'createExecution',
					'getExecution',
					'listExecutions',
				],
			},
		},
	},

	// --- Create / Update Fields ---
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'A name for the function',
		displayOptions: {
			show: {
				resource: ['function'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Runtime',
		name: 'runtime',
		type: 'options',
		required: true,
		default: 'node-18.0',
		description: 'The execution runtime environment',
		options: [
			{ name: 'Node.js 18.0', value: 'node-18.0' },
			{ name: 'Node.js 20.0', value: 'node-20.0' },
			{ name: 'PHP 8.2', value: 'php-8.2' },
			{ name: 'PHP 8.3', value: 'php-8.3' },
			{ name: 'Ruby 3.2', value: 'ruby-3.2' },
			{ name: 'Ruby 3.3', value: 'ruby-3.3' },
			{ name: 'Python 3.11', value: 'python-3.11' },
			{ name: 'Python 3.12', value: 'python-3.12' },
			{ name: 'Deny 1.35', value: 'deno-1.35' },
			{ name: 'Dart 3.0', value: 'dart-3.0' },
			{ name: 'Dart 3.1', value: 'dart-3.1' },
			{ name: 'Bun 1.0', value: 'bun-1.0' },
			{ name: 'Java 18.0', value: 'java-18.0' },
			{ name: 'Swift 5.8', value: 'swift-5.8' },
			{ name: 'Kotlin 1.8', value: 'kotlin-1.8' },
			{ name: '.NET 7.0', value: 'dotnet-7.0' },
		],
		displayOptions: {
			show: {
				resource: ['function'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Execute Access Roles',
		name: 'execute',
		type: 'json',
		default: '["role:all"]',
		description: 'An array of role strings that can execute the function. E.g. ["role:all"]',
		displayOptions: {
			show: {
				resource: ['function'],
				operation: ['create', 'update'],
			},
		},
	},

	// --- Execution Fields ---
	{
		displayName: 'Data',
		name: 'data',
		type: 'string',
		default: '',
		description: 'String data to pass to the function during execution',
		displayOptions: {
			show: {
				resource: ['function'],
				operation: ['createExecution'],
			},
		},
	},
	{
		displayName: 'Execute Asynchronously',
		name: 'async',
		type: 'boolean',
		default: false,
		description: 'Whether to execute the function asynchronously or wait for the result',
		displayOptions: {
			show: {
				resource: ['function'],
				operation: ['createExecution'],
			},
		},
	},
	{
		displayName: 'Execution ID',
		name: 'executionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the execution to retrieve',
		displayOptions: {
			show: {
				resource: ['function'],
				operation: ['getExecution'],
			},
		},
	},
];
