const { Client, MessageEmbed, Message, MessageActionRow,MessageButton } = require("discord.js");
const { prefix, botid } = require("./../../config.json");

module.exports = {
  name: "learn",
  description: "learn how to get url of your project",
  ownerOnly: false,
  run: async (client, message, args) => {
    let youtube_sub = "https://youtube.com/channel/UCrqGsp8-fPxzK4-E2EOpe9A";

   

    const contents =
      "★ Go to your replit project and open index.js/server.js.\n★ Then in there type:\n ```\nconst express = require('express');\nconst app = express();\nconst port = 3000;\napp.listen(port, () => console.log(`Bot running on http://localhost:${port}`));```\n\n" 
      

    let embed = new MessageEmbed()
      .setTitle("Here are short info how to use me: ")
      .setDescription(contents)
      .setColor("RANDOM")
      .setFooter(`Prefix: "${prefix}"`)
      .setThumbnail(client.user.displayAvatarURL())      
      .setTimestamp();
          
          const row = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot%20applications.commands`)
        .setLabel("INVITE")
            .setStyle("LINK")
    )
          const row1 = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.gg/a7TmUZWqPb`)
        .setLabel("SUPPORT SERVER")
            .setStyle("LINK")
    )
          

    return message.channel.send({ embeds: [embed], components: [row, row1] });
  },
};
