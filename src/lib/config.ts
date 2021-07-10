import { ClientOptions } from 'discord.js';

export interface Config {
	client: ClientOptions;
}

const config: Config = {
	client: {}
};

export default config;
