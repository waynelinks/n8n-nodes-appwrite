import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		noDataExpression: true,
		type: 'options',
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new user',
				action: 'Create a user',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all users',
				action: 'List all users',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a user by ID',
				action: 'Get a user',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a user by ID',
				action: 'Update a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a user by ID',
				action: 'Delete a user',
			},
			{
				name: 'Get Preferences',
				value: 'getPrefs',
				description: 'Get user preferences by ID',
				action: 'Get user preferences',
			},
			{
				name: 'List Sessions',
				value: 'listSessions',
				description: 'List all sessions for a user',
				action: 'List user sessions',
			},
			{
				name: 'Delete Session',
				value: 'deleteSession',
				description: 'Delete a specific session for a user',
				action: 'Delete user session',
			},
			{
				name: 'Delete Sessions',
				value: 'deleteSessions',
				description: 'Delete all sessions for a user',
				action: 'Delete all user sessions',
			},
			{
				name: 'List Logs',
				value: 'listLogs',
				description: 'List logs for a user',
				action: 'List user logs',
			},
			{
				name: 'List Memberships',
				value: 'listMemberships',
				description: 'List memberships for a user in teams and projects',
				action: 'List user memberships',
			},
		],
		default: 'list',
		description: 'The operation to perform on the user resource',
	},
];

export const userFields: INodeProperties[] = [
	// --- Main Identifiers ---
	{
		displayName: "User ID",
		name: "userId",
		type: "string",
		required: true,
		description:
			'The unique ID of the user. Use "unique()" to auto-generate for creation.',
		displayOptions: {
			show: {
				resource: ["user"],
				operation: [
					"create",
					"get",
					"update",
					"delete",
					"getPrefs",
					"listSessions",
					"deleteSession",
					"deleteSessions",
					"listLogs",
					"listMemberships",
				],
			},
		},
		default: "unique()",
	},

	// --- Optional Fields for CREATE ---
	{
		displayName: "Additional Fields",
		name: "createFields",
		type: "collection",
		placeholder: "Add Optional Field",
		default: {},
		description: "Optional fields for creating a new user.",
		displayOptions: {
			show: {
				resource: ["user"],
				operation: ["create"],
			},
		},
		options: [
			{ displayName: "Email", name: "email", type: "string", default: "" },
			{
				displayName: "Password",
				name: "password",
				type: "string",
				typeOptions: { password: true },
				default: "",
			},
			{ displayName: "Name", name: "name", type: "string", default: "" },
			{
				displayName: "Phone Number",
				name: "phone",
				type: "string",
				default: "",
				placeholder: "+27821234567",
				description: "Phone number in E.164 format",
			},
		],
	},

	// --- Optional Fields for UPDATE ---
	{
		displayName: "Fields to Update",
		name: "updateFields",
		type: "collection",
		placeholder: "Add Field to Update",
		default: {},
		description: "Select which fields to update for the user.",
		displayOptions: {
			show: {
				resource: ["user"],
				operation: ["update"],
			},
		},
		options: [
			{ displayName: "Email", name: "email", type: "string", default: "" },
			{
				displayName: "Password",
				name: "password",
				type: "string",
				typeOptions: { password: true },
				default: "",
			},
			{ displayName: "Name", name: "name", type: "string", default: "" },
			{
				displayName: "Phone Number",
				name: "phone",
				type: "string",
				default: "",
				placeholder: "+27821234567",
				description: "Phone number in E.164 format",
			},
			{
				displayName: "Status (Active)",
				name: "status",
				type: "boolean",
				default: true,
			},
			{
				displayName: "Preferences",
				name: "prefs",
				type: "json",
				default: "{}",
			},
		],
	},

	// --- Other Fields ---
	{
		displayName: "Session ID",
		name: "sessionId",
		type: "string",
		required: true,
		default: "",
		displayOptions: {
			show: {
				resource: ["user"],
				operation: ["deleteSession"],
			},
		},
	},
	{
		displayName: "Queries",
		name: "queries",
		type: "json",
		default: "[]",
		description: "Array of queries to filter results.",
		displayOptions: {
			show: {
				resource: ["user"],
				operation: ["list"],
			},
		},
	},
];
