import { Client, GatewayIntentBits } from "discord.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

const firebaseConfig = {
  apiKey: "AIzaSyB_h7hHz6WYsPemSBtJ690ADcCdk1jBgkA",
  authDomain: "discord-5d5dd.firebaseapp.com",
  projectId: "discord-5d5dd",
  storageBucket: "discord-5d5dd.firebasestorage.app",
  messagingSenderId: "551252331990",
  appId: "1:551252331990:web:b86bdffab1ba8718f46877"
};
initializeApp(firebaseConfig);
const db = getFirestore();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "startgame") {
    await interaction.reply("Starting UNO game! Check the website to join!");
    // تحديث Firebase لإرسال إشعار لكل اللاعبين
  }
});

client.login("YOUR_BOT_TOKEN_HERE");