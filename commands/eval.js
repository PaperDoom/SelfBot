exports.run = async (client, message, args) => {
  let clean = text => {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };
  let promiseFunc = async code => {
    return new Promise(async (res, rej) => {
      try {
        let result = await eval(code)
        res(result)
      } catch (err) {
        console.log(err);
      }
    });
  };

  try {
    let code = args.join(" ");
    let evaled = await promiseFunc(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), { code: "xl" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
};
