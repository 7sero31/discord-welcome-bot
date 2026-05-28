// made by sero

const { Client, GatewayIntentBits, Partials, EmbedBuilder, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

const TOKEN = "YOUR_BOT_TOKEN";
const CLIENT_ID = "YOUR_CLIENT_ID";

let config = {};

if (fs.existsSync("./config.json")) {
  try {
    config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
  } catch {
    config = {};
  }
}

const commands = [
  new SlashCommandBuilder()
    .setName("setwelcome")
    .setDescription("set welcome channel")
    .addChannelOption(opt =>
      opt.setName("channel").setDescription("channel").setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("embed")
    .setDescription("send embed")
    .addChannelOption(opt =>
      opt.setName("channel").setDescription("channel").setRequired(true)
    )
    .addStringOption(opt => opt.setName("title").setDescription("title"))
    .addStringOption(opt => opt.setName("description").setDescription("description"))
    .addStringOption(opt => opt.setName("image").setDescription("image url"))
    .addStringOption(opt => opt.setName("thumbnail").setDescription("thumbnail url"))
    .addStringOption(opt => opt.setName("button").setDescription("button url"))
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

async function registerCommands() {
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
}

function saveConfig() {
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
}

client.on("ready", () => {
  console.log(client.user.tag + " online");
});

client.on("guildMemberAdd", (member) => {
  const channelId = config[member.guild.id];
  if (!channelId) return;

  const channel = member.guild.channels.cache.get(channelId);
  if (!channel || !channel.isTextBased()) return;

  const embed = new EmbedBuilder()
    .setTitle("Welcome")
    .setDescription("welcome " + member.user.username)
    .setColor(0x8a2be2);

  channel.send({ embeds: [embed] });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "setwelcome") {
    const channel = interaction.options.getChannel("channel");

    config[interaction.guild.id] = channel.id;
    saveConfig();

    return interaction.reply({ content: "set", ephemeral: true });
  }

  if (interaction.commandName === "embed") {
    const channel = interaction.options.getChannel("channel");

    if (!channel || !channel.isTextBased()) {
      return interaction.reply({ content: "invalid channel", ephemeral: true });
    }

    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const image = interaction.options.getString("image");
    const thumbnail = interaction.options.getString("thumbnail");
    const button = interaction.options.getString("button");

    const embed = new EmbedBuilder().setColor(0x2b2d31);

    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (image?.startsWith("http")) embed.setImage(image);
    if (thumbnail?.startsWith("http")) embed.setThumbnail(thumbnail);

    const payload = { embeds: [embed] };

    if (button?.startsWith("http")) {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("link")
          .setStyle(ButtonStyle.Link)
          .setURL(button)
      );
      payload.components = [row];
    }

    await channel.send(payload);
    return interaction.reply({ content: "sent", ephemeral: true });
  }
});

(async () => {
  await registerCommands();
  await client.login(TOKEN);
})();
