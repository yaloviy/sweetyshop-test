let tg = window.Telegram.WebApp;

tg.expand();



const params = new URLSearchParams(tg.initData);
const userParam = params.get('user');
const user = JSON.parse(userParam);
const username = user.username; // Вот username пользователя


let usercard = document.querySelector(".header-container");
usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">${username}</p>`);

