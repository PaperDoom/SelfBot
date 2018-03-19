const Discord = require("discord.js");
exports.run = async (client, message, args) => {

    await message.delete();
    const embed = new Discord.RichEmbed()
        .setDescription(args.join(" "))
        .setColor([114, 137, 218]);
    message.channel.send({
        embed
    });

}