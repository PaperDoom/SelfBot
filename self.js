const Discord = require("discord.js");
const client = new Discord.Client({
    disabledEvents: ['GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'CHANNEL_PINS_UPDATE',
        'USER_NOTE_UPDATE', 'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE',
        'TYPING_START', 'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE',
    ],
    messageCacheMaxSize: 1,
    messageCacheLifetime: 60,
    messageSweepInterval: 120
});
const fs = require("fs");
const config = require("./config")

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, config, ...args));
        delete require.cache[require.resolve(`./events/${file}`)]
    });
});

client.login(config.Token.Self);