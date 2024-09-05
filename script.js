// Проверка подписки пользователя и получение вознаграждения
const API_URL = 'https://api.telegram.org/bot7534613410:AAHj1AFkC_L9oOA_05OpqQ_ejiZEUKjnSL4/';
const CHANNEL_ID = '@RatcCoin';

// Баланс пользователя
let userBalance = localStorage.getItem('ratcoinBalance') || getRandomBalance();
document.getElementById('balance')?.textContent = userBalance + ' RatCoin';

// Функция генерации случайного баланса
function getRandomBalance() {
    const balance = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    localStorage.setItem('ratcoinBalance', balance);
    return balance;
}

// Функция проверки подписки
async function checkSubscription(userId) {
    const response = await fetch(`${API_URL}getChatMember?chat_id=${CHANNEL_ID}&user_id=${userId}`);
    const data = await response.json();
    return data.result.status === 'member';
}

// Награда за выполнение задания
document.getElementById('claimTask')?.addEventListener('click', async () => {
    const userId = 'USER_ID'; // Замените на реальный идентификатор пользователя
    const isSubscribed = await checkSubscription(userId);

    if (isSubscribed) {
        if (localStorage.getItem('taskCompleted') !== 'true') {
            userBalance = parseInt(userBalance) + 1000;
            localStorage.setItem('ratcoinBalance', userBalance);
            document.getElementById('balance').textContent = userBalance + ' RatCoin';
            localStorage.setItem('taskCompleted', 'true');
            alert('Вы получили 1000 RatCoin за подписку!');
        } else {
            alert('Вы уже получили вознаграждение за подписку.');
        }
    } else {
        alert('Пожалуйста, подпишитесь на канал.');
    }
});

// Привязка кошелька через Telegram
document.getElementById('addWallet')?.addEventListener('click', () => {
    document.getElementById('walletModal').style.display = 'block';
});

document.querySelectorAll('.wallet-option').forEach(option => {
    option.addEventListener('click', async () => {
        const wallet = option.getAttribute('data-wallet');
        const walletNumber = '123456789'; // Замените на реальный номер кошелька

        // Отправка номера кошелька админу
        await fetch(`${API_URL}sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: '@Somik3o',
                text: `Кошелёк привязан: ${walletNumber}`
            })
        });

        // Обновление интерфейса
        document.getElementById('walletModal').style.display = 'none';
        alert('Кошелёк привязан успешно.');
    });
});
