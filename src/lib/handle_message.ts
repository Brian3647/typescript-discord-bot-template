import { Client, Message, Collection } from 'discord.js';
import { join } from 'path';
import { log } from './logger';
import { Command, Default } from './types';
import config from '../config';

export default async (
	client: Client,
	command_files: string[],
	path: string
): Promise<Array<Command>> => {
	const commands = new Collection<string, Command>();
	const command_arr: Array<Command> = [];

	for (let i = 0; i < command_files.length; i++) {
		const cmd_path: string = join(path, command_files[i]);
		const cmd: Default<Command> = (await import(cmd_path)) as Default<Command>;
		if (cmd.default) {
			commands.set(cmd.default.name, cmd.default);
			command_arr.push(cmd.default);
		}
	}

	client.on('message', (message: Message) => {
		if (!message.content.startsWith(config.prefix) || message.author.bot)
			return;

		const args: string[] = message.content
			.slice(config.prefix.length)
			.trim()
			.split(/ +/);
		const command: string = (args.shift() || '').toLowerCase();
		const cmd: Command | false =
			commands.get(command) ||
			commands.find((c: Command) => (c.alias || []).includes(command)) ||
			false;

		if (!cmd) return;

		cmd.execute(client, message, args);
	});

	log('Loaded commands');

	return command_arr;
};
