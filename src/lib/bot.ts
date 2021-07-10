import fs from 'fs';
import { join } from 'path';
import { Client } from 'discord.js';
import { Command, Default, Event } from './types.d';
import { log } from './logger';
import handle_message from './handle_message';

export default class Bot {
	readonly client: Client;
	readonly commands: Command[];
	readonly events: Event[];

	constructor(client: Client) {
		this.client = client;
		this.commands = [];
		this.events = [];
	}

	async start(): Promise<void> {
		await this.load_commands(join(__dirname, '..', 'commands'));
		await this.load_events(join(__dirname, '..', 'events'));
	}

	private async load_commands(p: string): Promise<void> {
		const dir: string[] = fs.readdirSync(p);

		this.commands.push(...(await handle_message(this.client, dir, p)));

		log('Loaded commands');

		return;
	}

	private async load_events(p: string): Promise<void> {
		const dir: string[] = fs
			.readdirSync(p)
			.filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

		dir.forEach(
			async (file: string): Promise<void> => {
				type DefaultEvent = Default<Event>;
				const cmd: DefaultEvent = (await import(join(p, file))) as DefaultEvent;
				const event = cmd.default;

				this.events.push(cmd.default);
				this.client.on(
					event.name,
					async (...args: unknown[]): Promise<void> => {
						log('Called event ' + event.name);
						await event.execute(this.client, args);
					}
				);
			}
		);

		log('Loaded events');

		return;
	}
}
