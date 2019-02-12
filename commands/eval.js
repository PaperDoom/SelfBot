

exports.run = async (client, message, args) => {

    let cleaner = async function(client, text) {
        if (text && text.constructor.name == "Promise")
          text = await text;
        if (typeof evaled !== "string")
          text = require("util").inspect(text, {depth: 1});
    
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");
    
        return text;
      };

    let code = args.join(" ");
    try {
      let evaled = eval(code);
      let clean = await cleaner(client, evaled);
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await cleaner(client, err)}\n\`\`\``);
    }

};

