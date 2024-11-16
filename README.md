# Moderasyon ve Loglama Discord Botu

![Discord.js](https://img.shields.io/badge/Discord.js-v14-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

Bu, Discord sunucuları için `discord.js` v14 kullanılarak geliştirilmiş bir moderasyon ve loglama botudur. Bot, banlama, kickleme, susturma ve mesaj temizleme gibi moderasyon komutları sağlar. Ayrıca, sunucudaki önemli olayları loglama ve küfür ile reklamları engellemek için özelleştirilebilir bir sistem içerir.

## Özellikler

- **Loglama Olayları:**
  - Mesaj silinmelerini ve düzenlemelerini loglar.
  - Kanal oluşturma, silme ve güncellemelerini loglar.
  - Rol oluşturma, silme ve güncellemelerini loglar.
  - Kullanıcıların sunucuya katılma, ayrılma ve banlanma olaylarını loglar.

- **Capslock ve Spam Engel:**
  - Fazla büyük harf kullanımını engelleme.
  - Aynı mesajı çok fazla ve hızlı şekilde gönderme engeli.

## Kurulum


1. Gerekli bağımlılıkları yükleyin:
    ```bash
    modul.bat dosyasını çalıştırın
    ```

2. `config.json` dosyasını oluşturun ve yapılandırın:
    ```json
    {
      "token": "BOT_TOKENINIZ",
      "ownerId:" "BOT_SAHIBI",
      "capsLockEnabled": true,
      "spamEnabled": true
      "logChannelId": "",
      "voiceChannelId": "",
      "guildId": "",
      "oldGuildName": "",
      "oldGuildIconURL": "",
      "oldGuildInvite": "",
    }
    ```

3. Botu başlatın:
    ```bash
    bslat.bat dosyasını çalıştırın
    ```

## Lisans

Bu proje, MIT Lisansı ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

## Teşekkürler

- [Discord.js](https://discord.js.org/) - Discord API'si ile etkileşim kurmak için güçlü bir kütüphane.
- Node.js - Chrome'un V8 motoru üzerinde çalışan JavaScript çalışma zamanı.

## İletişim
[Discord Sunucumuz](https://discord.gg/novadev)
