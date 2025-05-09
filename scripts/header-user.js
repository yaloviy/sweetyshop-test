let tg = window.Telegram.WebApp;
let usercard = document.querySelector(".header-container");

function isEmpty(str) {
  if (str.trim() == '') 
    return false;
    
  return true;
}

usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">${isEmpty(localStorage.getItem('username')) ? localStorage.getItem('username') : isEmpty(localStorage.getItem('firstname')) ? localStorage.getItem('firstname') : 'Добро пожаловать!'}</p>`);
