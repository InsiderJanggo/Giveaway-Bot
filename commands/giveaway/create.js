const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "create",
    aliases: ["start"],
    description: "Start A Giveaway event",
    usage: "<channel> <duration> <nomor of winner> <price>",
    category: "giveaway",
    run: async(client,message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send(`:x: You Need To Have Manage Messages Permissions`);
        }

        let channel = message.mentions.channels.first();

        if(!channel) return message.channel.send(`${message.author}, Please Mention A Valid Channel`);

        let duration = args[1];
        if(!duration || isNaN(ms(duration))){
            return message.channel.send(':x: You have to specify a valid duration!');
        }

        let winners = args[2];
        if(isNaN(winners)){
            return message.channel.send(':x: You have to specify a valid number of winners!');
        }

        // Giveaway prize
        let giveawayPrize = args.slice(3).join(' ');
        // If no prize is specified
        if(!giveawayPrize){
            return message.channel.send(':x: You have to specify a valid prize!');
        }

         // Start the giveaway
    client.giveawaysManager.start(channel, {
        // The giveaway duration
        time: ms(duration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: winners,
      // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: `Time remaining: **${duration}**!`,
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: `Congratulations, ${winners}! You won **${prize}**!`,
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway started in ${channel}!`);
    }
}