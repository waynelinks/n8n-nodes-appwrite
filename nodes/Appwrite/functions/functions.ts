import { type Client, Functions, type Models, ID, type Runtime } from 'node-appwrite';

async function getFunctionsService(client: Client): Promise<Functions> {
	return new Functions(client);
}

export async function createFunction(
	client: Client,
	functionId: string,
	name: string,
	runtime: Runtime,
	execute?: string[],
): Promise<Models.Function> {
	const functions = await getFunctionsService(client);
	let newFunctionId = functionId;
	if (functionId.toLowerCase() === 'unique()') {
		newFunctionId = ID.unique();
	}
	return functions.create(newFunctionId, name, runtime, execute);
}

export async function getFunction(client: Client, functionId: string): Promise<Models.Function> {
	const functions = await getFunctionsService(client);
	return functions.get(functionId);
}

export async function listFunctions(client: Client): Promise<Models.FunctionList> {
	const functions = await getFunctionsService(client);
	return functions.list();
}

export async function deleteFunction(client: Client, functionId: string): Promise<void> {
	const functions = await getFunctionsService(client);
	await functions.delete(functionId);
}

export async function createExecution(
	client: Client,
	functionId: string,
	data?: string,
	async?: boolean,
): Promise<Models.Execution> {
	const functions = await getFunctionsService(client);
	return functions.createExecution(functionId, data, async);
}

export async function getExecution(
	client: Client,
	functionId: string,
	executionId: string,
): Promise<Models.Execution> {
	const functions = await getFunctionsService(client);
	return functions.getExecution(functionId, executionId);
}

export async function listExecutions(
	client: Client,
	functionId: string,
): Promise<Models.ExecutionList> {
	const functions = await getFunctionsService(client);
	return functions.listExecutions(functionId);
}
