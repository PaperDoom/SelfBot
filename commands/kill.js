exports.run = (client, message, args) => {

    message.channel.send("Logging out.")
    client.setTimeout(() => {
        client.destroy(error => {
            console.log(error)
        })
        process.exit();
    }, 3000)
}