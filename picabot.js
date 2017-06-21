const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "MzI3MTIyNTk3OTAyODExMTM3.DCwwQQ.BIxxQQEfezftpzywZLtawDeMoKU";

var commands = {
    "ping": {
        description: "Pings the bot",
        process: function(message, parameters){
            message.reply("Pong :ping_pong:");
        }
    },
    "bot": {
        description: "Tells you information about the bot",
        process: function(message, parameters){
            message.reply("I am a discord bot for didney worl who has an appetite for non-nutritive substances");
        }
    },
    "help": {
        description: "Gives you a list of commands you can use",
        process: function(message, parameters){
            message.reply("There is no help yet"); //show list of commands if no parameters otherwise show description
        }
    }
};

var checkForCommand = function(message){
    if(!message.author.bot && message.content.startsWith("!")){
        var args = message.content.substring(1).split(" ");
        try{
            commands[args[0]].process(message);
        } catch(e){
            message.reply("Sorry that isn't a command yet :sob:");
            message.channel.send("You can type `!help` to see a list of my commands");
        }
        
    }
}

bot.on("ready", () => console.log("Bot ready!"));
bot.on("disconnect", () => {
    console.log("Disconnected!");
    process.exit(1);
});
bot.on("guildMemberAdd", member => {
    member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
    member.guild.defaultChannel.send("You can type `!help` at anytime to see my commands");
});
bot.on("message", message => checkForCommand(message));
bot.on("messageUpdate", (oldMessage, newMessage) => checkForCommand(newMessage));

bot.login(token);