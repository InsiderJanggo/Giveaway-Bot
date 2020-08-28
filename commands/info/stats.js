const {version, MessageEmbed} = require("discord.js");

module.exports = {
    name: "stats",
    aliases: ["status"],
    description: "Show The Bot Stats",
    category: "info",
    usage: "[none]",
    run: async(client, message, args) => {
        if (message.author.bot) return;
        let prefix = process.env.PREFIX;
        if(!message.content.startsWith(prefix)) return;

        let serverCount =  client.guilds.cache.size;
        let userCount = client.users.cache.size;
        let channelsCount = client.channels.cache.size;

        let stats = new MessageEmbed()
        .setTitle(`Statistics of ${client.user.username}`)
        .setColor('BLUE')
        .addField("Discord.js:", `${version}`)
        .addField("Server Count", `${serverCount}`)
        .addField("Users Count", `${userCount}`)
        .addField("Channel's Count", `${channelsCount}`)
        .addField("Hosted Platform", "Hosting on Danbot hosting 99% Uptime")
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(stats);
    }
}