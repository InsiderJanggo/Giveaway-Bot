const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "invite",
    aliases: [""],
    description: "Give The Bot Invite Link And Support Server",
    category: "info",
    usage: "[none]",
    run: async(client, message, args) => {
        let invite = process.env.INVITE_LINK;
        let server = process.env.GUILD_INVITE;
        
        let embed = new MessageEmbed()
        .setTitle("Invite & Support Link!")
        .addField("Invite Link", `[Click here to invite me](${invite})`)
        .addField("Support Server", `[Click to join support Server](${server})`)
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, client.user.displayAvatarURL())
        message.channel.send({embed});
    },
};