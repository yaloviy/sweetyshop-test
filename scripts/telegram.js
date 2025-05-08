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

