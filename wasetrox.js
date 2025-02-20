const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// Made in Wasetrox
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Komut koleksiyonları
client.commands = new Collection();
client.prefix = '.'; // Prefix burada tanımlandı
//Made In Wasetrox
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('error', console.error);

// Komutları yükleme
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Komutları koleksiyonlara ekleme
    client.commands.set(command.name, command);
}

// Event handler'ları yükleme
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    client.on(event.name, event.execute.bind(null, client));
}

// Mesajı dinleyerek komutları çalıştırma
client.on('messageCreate', message => {
    // Mesajın bot tarafından gönderilmediğinden emin ol
    if (message.author.bot) return;

    // Mesajın prefix ile başladığını kontrol et
    if (!message.content.startsWith(client.prefix)) return;

    // Komut ismini ve argümanları ayır
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Komutun geçerli olup olmadığını kontrol et
    const command = client.commands.get(commandName);

    if (!command) return;

    // Komutu çalıştır
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Komutu çalıştırırken bir hata oluştu!');
    }
});

client.login(process.env.TOKEN);
