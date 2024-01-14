const express = require("express");
require("dotenv").config(); 
const TOKEN = process.env.token;

const app = express();
const PORT = 3000;

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Rhythm Reactor bot is running!");
});

client.once("ready", () => {
  console.log("Bot is online and ready!");
});

client.on("messageCreate", async (message) => {
  if (
    message.content.includes("open.spotify.com/") ||
    message.content.includes("youtube.com/") ||
    message.content.includes("m.youtube.com/") ||
    message.content.includes("youtu.be/") ||
    message.content.includes("music.apple.com")
  ) {
    await message.react("👍");
    await message.react("👎");
  }
});

client.login(TOKEN).catch((err) => {
  console.error("Failed to log in:", err);
});
