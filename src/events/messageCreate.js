const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config.json');
const configPath = path.join(__dirname, '../../config.json'); // config.json yolunu belirt

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if (message.author.bot) return; // Bot mesajlarını görmezden gel
        
        const guild = message.guild;
        const member = message.member;
        const content = message.content;

        // Sistem kapalıysa işleme devam etme
        if (!config.systemEnabled) return;

        // Capslock kontrolü - %70'ten fazlası büyük harf ise
        const capsLimit = 70;
        const capsCount = content.replace(/[^A-Z]/g, '').length;
        const capsPercentage = (capsCount / content.length) * 100;

        // CapsLock sınırı aşıldıysa
        if (capsPercentage > capsLimit) {
            try {
                // Mesajı sil
                await message.delete();
                console.log(`Mesaj silindi: ${message.id}`);
            } catch (err) {
                console.error(`Mesaj silinemedi: ${err.message}`);
                console.error(err.stack);
            }

            try {
                // Kullanıcıya 5 dakika zaman aşımı (timeout)
                const timeoutDuration = 5 * 60 * 1000; // 5 dakika
                await member.timeout(timeoutDuration, 'Aşırı büyük harf kullanımı');
                console.log(`Kullanıcıya zaman aşımı atıldı: ${member.user.tag}`);
            } catch (err) {
                console.error(`Kullanıcıya zaman aşımı atılamadı: ${err.message}`);
                console.error(err.stack);
            }

            // Log kanalına bilgilendirme gönderme
            const logChannel = guild.channels.cache.get(config.logChannelId);
            if (logChannel) {
                const embed = new EmbedBuilder()
                    .setColor('#ff0000') // Kırmızı renk
                    .setTitle('Kullanıcı Zaman Aşımına Alındı ve Mesajı Silindi')
                    .setDescription(`🔨 **${member.user.tag}** aşırı büyük harf kullandığı için mesajı silindi ve 5 dakika süreyle zaman aşımına alındı.`)
                    .setTimestamp()
                    .setFooter({ text: 'Güvenlik Sistemi', iconURL: client.user.displayAvatarURL() });

                logChannel.send({ embeds: [embed] }).catch(err => {
                    console.error(`Log mesajı gönderilemedi: ${err.message}`);
                });
            } else {
                console.error(`Log kanalı bulunamadı: ${config.logChannelId}`);
            }
        }
    }
};