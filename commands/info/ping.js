module.exports = {
    name: "ping",
    aliases: ["pong", "aliases"],
    description: "Check The Bot Latency",
    usage: "[none]",
    category: "info",
    run: async(client,message,args) => {
        let now = Date.now();
        let m = await message.channel.send("Pinging...");
        m.edit(`Pong! \`${Date.now() - now}\` ms`);
    }
}