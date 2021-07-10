import { Client, Message } from 'discord.js';
import { Command } from '../lib/types.d';

const command: Command = {
	name: 'ping',
	alias: ['p'],
	description: 'Test command',
	execute: (_: Client, message: Message) => {
		message.channel.send('Pong!');
	}
};

export default command;
