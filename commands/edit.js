exports.run = async (client, msg, args) => {
    try {
        await msg.delete()
        args = args.join(" ")
        msg.channel.fetchMessages({
            limit: 20
          })
          .then(messages => {
            let msg_array = messages.filter(m => m.author.id === client.user.id);
            let messageToEdit = msg_array.first()
            messageToEdit.edit(args)
    
          });
    }
    catch(e) {
        console.log(e)
    }
  
  };