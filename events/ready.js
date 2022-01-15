const client = require("../index.js");
const UrlsConfig = require('../database/models/UrlsConfig');
client.on("ready", () => 
      console.log(`Successfully Logged in as ${client.user.tag}`),
         
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
})
          );
  


