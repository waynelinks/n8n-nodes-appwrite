import { type Client, Users, type Models, ID } from 'node-appwrite';

async function getUsersService(client: Client): Promise<Users> {
	return new Users(client);
}

// In users/functions.ts
export async function createUser(
	client: Client,
	userId: string,
	email?: string,
	password?: string,
	name?: string,
	phone?: string,
): Promise<Models.User<Models.Preferences>> {
	const users = await getUsersService(client);
	let newUserId = userId;
	if (userId.toLowerCase() === "unique()") {
		newUserId = ID.unique();
	}
	// CORRECTED: The 'phone' parameter is now passed to the SDK method.
	return users.create(newUserId, email, phone, password, name);
}

export async function listUsers(
	client: Client,
	queries?: string[],
): Promise<Models.UserList<Models.Preferences>> {
	const users = await getUsersService(client);
	return users.list(queries);
}

export async function getUser(
	client: Client,
	userId: string,
): Promise<Models.User<Models.Preferences>> {
	const users = await getUsersService(client);
	return users.get(userId);
}

export async function deleteUser(client: Client, userId: string): Promise<void> {
	const users = await getUsersService(client);
	await users.delete(userId);
	return;
}

// Consolidated update function
export async function updateUser(
	client: Client,
	userId: string,
	updates: {
		email?: string;
		password?: string;
		name?: string;
		phone?: string;
		status?: boolean;
		prefs?: object;
	},
): Promise<Models.User<Models.Preferences>> {
	const users = await getUsersService(client);
	if (updates.email) await users.updateEmail(userId, updates.email);
	if (updates.password) await users.updatePassword(userId, updates.password);
	if (updates.name) await users.updateName(userId, updates.name);
	if (updates.phone) await users.updatePhone(userId, updates.phone);
	if (updates.status !== undefined) await users.updateStatus(userId, updates.status);
	if (updates.prefs && Object.keys(updates.prefs).length > 0)
		await users.updatePrefs(userId, updates.prefs);

	return users.get(userId); // Return the updated user object
}

export async function getUserPrefs(client: Client, userId: string): Promise<Models.Preferences> {
	const users = await getUsersService(client);
	return users.getPrefs(userId);
}

export async function listUserSessions(
	client: Client,
	userId: string,
): Promise<Models.SessionList> {
	const users = await getUsersService(client);
	return users.listSessions(userId);
}

export async function deleteUserSession(
	client: Client,
	userId: string,
	sessionId: string,
): Promise<void> {
	const users = await getUsersService(client);
	await users.deleteSession(userId, sessionId);
	return;
}

export async function deleteUserSessions(client: Client, userId: string): Promise<void> {
	const users = await getUsersService(client);
	await users.deleteSessions(userId);
	return;
}

export async function listUserLogs(client: Client, userId: string): Promise<Models.LogList> {
	const users = await getUsersService(client);
	return users.listLogs(userId);
}

export async function listUserMemberships(
	client: Client,
	userId: string,
): Promise<Models.MembershipList> {
	const users = await getUsersService(client);
	return users.listMemberships(userId);
}
