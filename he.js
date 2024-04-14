const bcrypt = require('bcrypt');
const prompt = require('prompt-sync')();

async function hashPasswords(passwords) {
    const saltRounds = 10; // Кількість ітерацій для генерації солі
    const hashedPasswords = [];
    for (let i = 0; i < passwords.length; i++) {
        try {
            const hash = await bcrypt.hash(passwords[i], saltRounds);
            hashedPasswords.push(hash);
        } catch (error) {
            console.error("Помилка хешування пароля:", error);
        }
    }
    return hashedPasswords;
}

// Отримання кількості паролів від користувача та їх хешування
const count = parseInt(prompt("Скільки паролів ви хочете хешувати? "));
const passwords = [];
for (let i = 0; i < count; i++) {
    const password = prompt(`Введіть пароль №${i + 1}: `);
    passwords.push(password);
}

hashPasswords(passwords)
    .then(hashedPasswords => {
        console.log("Хеші паролів:");
        hashedPasswords.forEach((hash, index) => {
            console.log(`Пароль №${index + 1}: ${hash}`);
        });
    })
    .catch(error => {
        console.error("Помилка:", error);
    });
