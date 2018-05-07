# About
A Discord bot for randomizing drop locations (named or grid) and custom challenges. Commands: #drop #grid #challenges. Borrowed some content from FortniteRoulette. "Forked" from my project-ziggurat repository: https://github.com/BitBruce/project-ziggurat

# Installation

1. `npm install`
1. Create a Discord bot on [Discord's developer site](https://discordapp.com/developers/applications/me)
1. Supply API token in `.env` file (`DISCORD_TOKEN=your_api_token_here`)
1. Add bot to your Discord server

# Run

- `node z-bot.js`

# Development

[Discord.js documentation](https://discord.js.org/#/docs/main/stable/general/welcome)

## ToDo/Ideas

- Use MongoDB & Mongoose
- Dialogflow for ML chatbot
- Chalk.js for pretty console messages

# Changelog
- v1.0 (04/23/18) - Release barebones app

---

## How to get the token

**1.** Open https://discordapp.com/developers/applications/me and click on "New App".

**2.** Enter a name for your bot and click "Create App"

**3.** Click on "Create a Bot user"

**4.** Reveal the bot's token. This token is used to login your bot.

>![](http://i.imgur.com/EbexbiD.gif)

## How to add a bot to your server

In order to add a bot to your server you need it's client id.

You can get your client id from the [same page](https://discordapp.com/developers/applications/me) where you created it.

>![](http://i.imgur.com/qzPDsp2.png)

With this id you can create an invite link for your bot:

**https://discordapp.com/api/oauth2/authorize?client_id=123456789&scope=bot&permissions=0**

If you are the owner or admin of the server you can use this link to add your bot to your server. Otherwise you have to give the link to the server owner/admin and ask him to add your bot.

*^ from @BtoBastian*
