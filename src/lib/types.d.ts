import { Message, Client } from 'discord.js';

export interface Command {
	name: string;
	alias?: string[];
	description?: string;
	execute: (
		client: Client,
		message: Message,
		args: string[]
	) => Promise<void> | void;
}

export interface Event {
	name: string;
	execute: (client: Client, ...args: unknown[]) => Promise<void> | void;
}

export interface ILogger {
	(...args: unknown[]): void;
}

type Default<T> = { default: T };
