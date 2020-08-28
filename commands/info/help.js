const { stripIndents } = require("common-tags");
const Discord = require('discord.js');
const cmd = require('../../handlers/command.js');

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Command')
        .addField('Prefix:', '**gg!**', true)
        .addField('Help Command', "n!help <command name>")
        .addField(
            "Donate", "[Link](https://trakteer.id/onguu-isurii-ufgns)"
        )
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            //.map(cmd => `- \`${cmd.name},\``)
            //.join("\n");
    }

    const info = client.categories
        //.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** ${commands(cat)}`)
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new Discord.MessageEmbed()
    
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
   
    return message.channel.send(embed.setColor("RANDOM").setDescription(info));
}