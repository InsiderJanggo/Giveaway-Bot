const {Client, Collection} = require("discord.js");
require("dotenv").config();
const fs = require('fs');

const client = new Client();
const {TOKEN, PREFIX} = process.env;

client.aliases = new Collection();
client.commands = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`${client.user.username} Is Ready`)
    client.user.setActivity(`To ${PREFIX}`, { type: "LISTENING" })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
})

client.on("message", async(message) => {
    let prefix = PREFIX;
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ + /g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command)
        command.run(client, message, args);
})

client.login(TOKEN);