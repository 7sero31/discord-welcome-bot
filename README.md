# Discord Welcome Bot

A simple Discord bot that sends welcome messages and allows custom embed messages using slash commands.

---

## What this bot does

- Sends a welcome message when a user joins
- Lets you set a welcome channel
- Creates custom embed messages
- Supports images, thumbnails and optional button links

---

## Setup Guide

### 1. Create your bot (Discord Developer Portal)

You need to create a bot first:

1. Go to: https://discord.com/developers/applications
2. Click **"New Application"**
3. Give it a name
4. Go to the **Bot** tab
5. Click **"Add Bot"**
6. Copy your **Bot Token**

⚠️ Keep your token private. Never share it.

---

### 2. Get your Client ID

1. In your application, open **General Information**
2. Copy the **Application ID**
3. This is your `CLIENT_ID`

---

### 3. Invite bot to your server

1. Go to **OAuth2 → URL Generator**
2. Select:
   - `bot`
   - `applications.commands`
3. Under Bot Permissions select:
   - Send Messages
   - Embed Links
4. Open the generated link and invite the bot

---

## Installation

### 1. Install dependencies

```bash
npm install
