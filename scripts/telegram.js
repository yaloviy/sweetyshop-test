let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";






let item = "";


const products = document.querySelectorAll('.products-block-cart')





products.forEach(el => {
    el.addEventListener('click', e => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        }
        else {
            tg.MainButton.setText("Вы выбрали товар " + e.target.parentElement.parentElement.parentElement.querySelector('.products-block-title').innerHTML);
            item = e.target.parentElement.id;
            tg.MainButton.show();
        }
    })
})




Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});




const params = new URLSearchParams(tg.initData);
const userParam = params.get('user');
const user = JSON.parse(userParam);
const username = user.username; // Вот username пользователя


let usercard = document.querySelector(".header-container");
usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">${username}</p>`);

