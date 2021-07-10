import { Client } from 'discord.js';
import client_config from './config';
import Bot from './bot';
import { log } from './logger';

export default async (env: NodeJS.ProcessEnv): Promise<void> => {
	log('Starting bot...');
	const client: Client = new Client(client_config.client);
	log('Client created');
	const bot: Bot = new Bot(client);
	await bot.start();
	log(
		`Loaded ${bot.events.length} event(s) and ${bot.commands.length} command(s)`
	);
	log('Bot started');
	client.login(env.TOKEN);
	log('Bot logged in');
};
