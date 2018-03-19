exports.run = async (client, message, args) => {
    const [replyTo, ...replyText] = args;
    const replyMessage = await message.channel.fetchMessage(replyTo);
    
    message.channel.send(replyText.join(" "), {
            embed: {
                color: 3447003,
                author: {
                    name: `${replyMessage.author.username}`,
                    icon_url: replyMessage.author.avatarURL
                },
                description: replyMessage.content
            }
        })
        .then(() => message.delete());
};