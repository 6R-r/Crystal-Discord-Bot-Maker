module.exports={
  ownerOnly: false,
  adminOnly: false,
  isNSFW: false,
  category: 'bot'
}
module.exports.execute = (Discord,client,config,message)=>{
  const channel=message.channel;
//console.log(message.author);
channel.send("Loading").then(m=>{
var yourping = new Date().getTime() - message.createdTimestamp
var botping = Math.round(client.ws.ping)
  m.edit(
  {
    embed: {
      author: {
        name: message.author.username,
        icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=128`
      },
      color: 0x0000FF,
      title: "Pong!",
      description: "Latency: "+(yourping)+"ms.\n API Latency: "+(botping)+"ms.\n"
    }
  }
  )
});
}
module.exports.help={
  name: (require('../config').command)+"ping",
  desc: "Returns Latency of the bot"
}
