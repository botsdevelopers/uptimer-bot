require('dotenv').config();
const { Client, Collection } = require('discord.js');
const UrlsConfig = require('./database/models/UrlsConfig');
const fetchProjects = require('./fetchProjects');
const { prefix, timeout, disable_fetching } = require('./config.json');

const client = new Client({
	intents: 32767,
	disableEveryone: true
});
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();

const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));

client.config = require('./config.json');
require('./handler')(client);

(async () => {
	await require('./database/connect')();

	let pros = await UrlsConfig.find();
	client.projectsSize = 0;
	client.projects = pros.map(p => p.projectURL);

	UrlsConfig.countDocuments({}, async (err, total) => {
		client.projectsSize = total;

		if (!disable_fetching) fetchProjects(client.projects, client);
	});
})();

setInterval(async () => {
	UrlsConfig.countDocuments({}, (err, total) => {
		client.projectsSize = total;
		client.user.setActivity(
			`${total} Project(s) on ${client.guilds.cache.size} servers`,
			{
				type: 'WATCHING'
			}
		);
	});
  

    

	if (!disable_fetching) fetchProjects(client.projects, client);
}, timeout);

client.login(process.env.TOKEN);

/* Made by REAL GAMING */
