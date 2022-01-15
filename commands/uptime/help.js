const { Client, MessageEmbed, Message, MessageActionRow,MessageButton } = require("discord.js");
const { prefix, botid } = require("./../../config.json");

module.exports = {
  name: "help",
  description: "Shows all commands of the bot",
  ownerOnly: false,
  run: async (client, message, args) => {
    let youtube_sub = "https://youtube.com/channel/UCrqGsp8-fPxzK4-E2EOpe9A";

    const commands = client.commands
      .filter((c) => c.ownerOnly === false)
      .map((cmd) => `\n <a:BlueStar:887999877957705759> - **${prefix}${cmd.name}** :-\n\`${cmd.description}\``);

    const contents =
      "** Welcome to Uptimer Robo's Help panel. Here's the commands to run the bot **\n\n\n <a:bs:886914437209026560> **To get started:**\n \` use .learn\`. \n\n ** <a:bs:886914437209026560> See the list of my Cmds :**.\n\n"+

      commands.sort().join("\n");

    let embed = new MessageEmbed()
      .setAuthor(
        "Uptimer Robo • Help Cmds..",
        "https://cdn.discordapp.com/emojis/890086553794256906.gif"
      )
      .setDescription(contents)
      .setColor("BLUE")
      .setFooter(`Prefix: "${prefix}"`)
      .setThumbnail(client.user.displayAvatarURL())      
      .setTimestamp();
          
          const row = new MessageActionRow().addComponents(
      new MessageButton()        
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot%20applications.commands`)
        .setLabel("INVITE")
            .setStyle("LINK"),
                        new MessageButton()        

        .setURL(`https://discord.gg/a7TmUZWqPb`)
        .setLabel("SUPPORT SERVER")
            .setStyle("LINK")
    )
          

    return message.channel.send({ embeds: [embed], components: [row] });
  },
};
