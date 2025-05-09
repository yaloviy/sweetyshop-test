let tg = window.Telegram.WebApp;
let usercard = document.querySelector(".header-container");

function isEmpty(str) {
  if (str.trim() == '') 
    return false;
    
  return true;
}

usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">${isEmpty(sessionStorage.getItem('username')) ? '@' + sessionStorage.getItem('username') : isEmpty(sessionStorage.getItem('firstname')) ? sessionStorage.getItem('firstname') : 'Добро пожаловать!'}</p>`);
