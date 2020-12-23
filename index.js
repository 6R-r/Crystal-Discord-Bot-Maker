const config = require('./config'); //the config.js, You can put the data you want in config.js. 
const Discord = require('d.js-12.0.0');
var fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
        status: config.status,  
        game: {
            name: config.game.name,  
            type: config.game.type 
        }
    });
});

client.on('message', msg => {
  if (msg.author.bot) return; //if author of message is a bot, do not do anything
if (msg.content.startsWith(config.command)) {
  var mesg = msg.content.substr(config.command.length).split(" ");
  fs.readFile('commands/'+mesg[0]+'.js', function(err, data) {
    if (err){ msg.reply("command not found"); //If there's no command file with matching name with the command, It will throw that error.
    return;
    }else{
    var comm = require('./commands/'+mesg[0]+'.js'); //require the requested command file
    /* if ownerOnly is set to true and the message author isn't the bot owner then deny. */ 
    if (comm.ownerOnly && msg.author.id != config.owner ) return (msg.channel.send({
    embed: {
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      color: 0xFF0000,
      title: "Access Denied",
      description: "This command is only available for the owner of bot."
    }
  }));
  /* if adminOnly is set to true and the message author isn't an admin of the server then deny. */ 
  if (comm.adminOnly && !msg.member.hasPermission('ADMINISTRATOR')) return (msg.channel.send({
    embed: {
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      color: 0xFF0000,
      title: "Access Denied",
      description: "This command is only available for Administators of this server."
    }
  }));
    comm.execute(Discord,client,config,msg); //if everything is fine execute the code of command file.
  }
  });
}
});
//and finally it will login using this code, remember to put `DISCORD_TOKEN=(your token here)` in your .env file, not directly into config.js or here.
client.login(config.token);
