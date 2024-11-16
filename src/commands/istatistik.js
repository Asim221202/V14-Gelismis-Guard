const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js'); // Discord.js kütüphanesinden EmbedBuilder'ı içe aktar
const configPath = path.join(__dirname, '../../config.json'); // config.json dosyasının yolu

module.exports = {
    name: 'status',
    description: 'Botun owner bilgisini, safe list kullanıcılarını ve bot istatistiklerini gösterir.',
    execute(message) {
        // config.json dosyasını oku
        fs.readFile(configPath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                const embed = new EmbedBuilder()
                    .setColor(0xff0000) // Kırmızı renk
                    .setDescription('Bir hata oluştu. Lütfen tekrar deneyin.');
                return message.reply({ embeds: [embed] });
            }

            // Dosyadaki JSON verisini parse et
            const config = JSON.parse(data);

            // Safe list ve ownerId'yi al
            const safeUsers = config.safeUsers;
            const ownerId = config.ownerId;

            // Botun istatistiklerini al (toplam sunucu ve kullanıcı sayısı)
            const totalGuilds = message.client.guilds.cache.size;
            const totalUsers = message.client.users.cache.size;

            // Embed yapısını oluştur
            const embed = new EmbedBuilder()
                .setTitle('Bot Durumu')
                .setColor(0x00ff00) // Yeşil renk
                .addFields(
                    { name: 'Sahibi', value: `<@${ownerId}>`, inline: true },
                    { name: 'Safe List Kullanıcıları', value: safeUsers.length > 0 ? safeUsers.map(id => `<@${id}>`).join('\n') : 'Safe list boş.', inline: true },
                    { name: 'Sunucu Sayısı', value: `${totalGuilds}`, inline: true },
                    { name: 'Toplam Kullanıcı Sayısı', value: `${totalUsers}`, inline: true }
                )
                .setTimestamp();

            // Embed'i mesaj olarak gönder
            message.reply({ embeds: [embed] });
        });
    },
};
