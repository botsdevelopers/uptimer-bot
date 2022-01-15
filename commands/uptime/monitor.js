const UrlsConfig = require("./../../database/models/UrlsConfig");
const { Client, MessageEmbed, Message } = require("discord.js");
const fetch = require("node-fetch");
const validUrl = require("valid-url");

module.exports = {
  name: "add",
  description: "Adds monitor to your project.",    
  ownerOnly: false,
  run: async (client, message, args) => {
    
    var url = args[0];

const botInServer = message.guild.members.cache.get(client.user.id);
    if (!url) return message.reply({ embeds: [new MessageEmbed().setTitle("Error | Provide a URL").setDescription("Please provide the url of your project you want to host here. ").setColor("RED").setFooter(message.member.user.tag).setThumbnail(client.user.displayAvatarURL()).setTimestamp()] });
    if (!validUrl.isUri(url)) {
      return message.channel.send({ embeds: [new MessageEmbed().setTitle("Error | Provide a valid URL").setDescription("Please provide the a valid url of your project you want to host here. ").setColor("RED").setFooter(message.member.user.tag).setThumbnail(client.user.displayAvatarURL()).setTimestamp()] });
    }
        
    var messageAlert = await message.channel.send({ content: `<@${message.member.user.id}>`, embeds: [new MessageEmbed().setColor("WHITE").setDescription("<a:time:746937170685722634> Please wait...").setFooter(message.member.user.tag).setThumbnail(message.member.user.displayAvatarURL())] });

    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
    });

    if (checkIfExsists === null) {
      
      await UrlsConfig.create({
        authorID: message.author.id,
        projectURL: url,
        pinged: 0,
      }).then(async () => {
        
        client.projects.push(url);
        try {
          
          await fetch(url);
        } catch (e) {
          
          await UrlsConfig.findOneAndUpdate(
            { projectURL: url },
            { error: true, errorText: e.message },
            { new: true }
          );
          message.reply("Fetching Error");
        }
        
        await messageAlert.edit({ embeds: [new MessageEmbed().setTitle("<a:r2:886915489190805515> Added Succesfully").setColor("GREEN").setDescription("Thanks for using me").setTimestamp()] });
        if (botInServer.permissions.has('ADMINISTRATOR') || !botInServer.permissions.has('MANAGE_MESSAGE')) {
            return message.delete();
        
             
    } else {      
      
      await messageAlert.edit({ embeds: [new MessageEmbed().setTitle("Error | Already Registered").setDescription("The Project you're Trying To Register Is Already In The Database").setColor("RED").setFooter(message.member.user.tag).setThumbnail(client.user.displayAvatarURL()).setTimestamp()] });
          if (botInServer.permissions.has('ADMINISTRATOR') || !botInServer.permissions.has('MANAGE_MESSAGE')) {
            return message.delete();
    }
        }
      });
    };
  }
}
          
  
