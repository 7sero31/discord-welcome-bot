# Discord Welcome Bot

Simple Discord bot with welcome messages and a custom embed system using slash commands.

---

## What this bot does

* Sends a welcome message when a user joins
* Lets you set a welcome channel with `/setwelcome`
* Creates custom embed messages with `/embed`
* Supports optional image, thumbnail and button link

---

## Setup

### 1. Install dependencies

```bash
npm install
```

---

### 2. Configure bot

Open `index.js` and set:

```js
const TOKEN = "YOUR_BOT_TOKEN";
const CLIENT_ID = "YOUR_CLIENT_ID";
```

---

## Where to get TOKEN and CLIENT_ID

Go to:
[https://discord.com/developers/applications](https://discord.com/developers/applications)

### Steps:

1. Create a new application
2. Go to **Bot** tab → create bot → copy TOKEN
3. Go to **General Information** → copy Application ID (CLIENT_ID)

---

## Invite bot

Go to:
OAuth2 → URL Generator

Select:

* bot
* applications.commands

Permissions:

* Send Messages
* Embed Links

Open generated link and invite bot to your server.

---

## Start bot

```bash
npm start
```

If everything works, the bot will go online.

---

## Setup welcome system

In your Discord server:

1. Type `/setwelcome`
2. Select a channel
3. Done

Now every new member will get a welcome message.

---

## Commands

### /setwelcome

Sets the channel for welcome messages.

### /embed

Sends a custom embed message.

Options:

* title
* description
* image URL
* thumbnail URL
* button link (optional)

---

## How data is stored

The bot uses a simple `config.json` file.

Example:

```json
{
  "SERVER_ID": "CHANNEL_ID"
}
```

Each server has its own welcome channel.

---

## Requirements

* Node.js 18+
* Discord bot in Developer Portal
* Permissions:

  * Send Messages
  * Embed Links

---

## Notes

Keep your token private!
