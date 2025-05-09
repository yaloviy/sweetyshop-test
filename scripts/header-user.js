// let tg = window.Telegram.WebApp;

// const params = new URLSearchParams(tg.initData);
// const userParam = params.get('user');
// const user = JSON.parse(userParam);
// const username = user.username;
let usercard = document.querySelector(".header-container");

// if (username == null) {
//     usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">${user.first_name}</p>`);
// } else {
//     usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">@${user.username}</p>`);
// }

usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">Добро пожаловать!</p>`);