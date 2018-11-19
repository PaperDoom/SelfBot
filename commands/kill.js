exports.run = (client, message, args) => {

    message.channel.send("Logging out.")
    client.setTimeout(() => {
        const cmd = require('node-cmd')
        cmd.run('pm2 stop self')
        client.destroy()

        //process.exit();

    }, 3000)
}