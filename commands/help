module.exports={
  ownerOnly: false,
  adminOnly: false,
  isNSFW: false,
  category: 'bot'
}
const fs = require('fs');
module.exports.execute = (Discord,client,config,message)=>{
  var itemsProcessed = 0;
  const channel=message.channel;
  let mes="";
//console.log(message.author);
fs.readdir("./commands", (err, files) => {
  files.forEach(file => {
    let e = require("./"+file);
    mes+=`**${e.help.name}**: ${e.help.desc}\n`;
    itemsProcessed++;
    console.log(itemsProcessed);
    if(itemsProcessed === files.length) {
      channel.send("Loading").then(m=>{
var yourping = new Date().getTime() - message.createdTimestamp
var botping = Math.round(client.ws.ping)
  m.edit('-');
  m.edit({
embed: {
      author: {
        name: message.author.username,
        icon_url:   `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=128`
      },
      color: 0x0000FF,
      title: "Commands",
      description: mes+"\n API Latency: "+botping
    }
  });
});
    }
  });
})

}
module.exports.help={
  name: (require('../config').command)+"help",
  desc: "Returns list of available commands"
}
