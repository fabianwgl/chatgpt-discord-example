import { ChatGPTAPI } from 'chatgpt';
import { Client, GatewayIntentBits } from 'discord.js';

import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });
const api = new ChatGPTAPI({   apiKey: process.env.OPEN_AI_KEY });

(async () => {
	client.login(process.env.DISCORD_BOT_KEY);

	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`);
	});

	client.on('messageCreate', async message => {
		if (message.content.includes(process.env.DISCORD_BOT_ID)) {
			console.log(message.content)
			const res = await api.sendMessage(message.content)
			message.reply(res.text)
		} 
	})
})();
