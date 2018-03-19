const Discord = require("discord.js");
const client = new Discord.Client({
    disabledEvents: ['GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'CHANNEL_PINS_UPDATE',
        'USER_NOTE_UPDATE', 'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE',
        'TYPING_START', 'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE',
    ],
    messageCacheMaxSize: 1,
    messageCacheLifetime: 1200,
    messageSweepInterval: 600
});
const fs = require("fs");
const config = require("./config")

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on("message", message => {
    if (message.author.id !== client.user.id) return;
    if (!message.content.startsWith(config.Prefix)) return

    const args = message.content.slice(config.Prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
        if (!fs.existsSync(`./commands/${command}.js`)) {
            message.channel.send("Unknown command.")
            return
        }
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);

    } catch (err) {
        console.error(err);
    };

});

client.login(config.Token.Self);