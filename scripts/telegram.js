let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";




    const products = [
        {
            id: 1,
            name: 'Набор сердце',
            price: 100,
            description: '24 штуки в коробке в виде сердца. Ассорти из 6 вкусов'
    
        },
        {
            id: 2,
            name: 'Набор красота',
            price: 150,
            description: 'Набор 16 шт. Вкусы: клубника - базилик, кокос, голубой сыр, пармезан'
            
        },
        {
            id: 3,
            name: 'Круглый набор',
            price: 200,
            description: '40 макаронс в круглой коробке с персональной надписью'
            
        },
        {
            id: 4,
            name: 'Набор на 9',
            price: 300,
            description: 'Набор из 9 штук в квадратной коробке. Вкусы: шоколад, фисташка, вишня'
            
        },
        {
            id: 5,
            name: 'Набор на 16',
            price: 350,
            description: 'Набор 16 шт. Вкусы: соленая карамель, голубой сыр, пармезан, шоколад'
            
        },
        {
            id: 6,
            name: 'Набор космос',
            price: 400,
            description: '22 макаронс, вкусы: фисташка, смородина, ванильный пломбир, шоколад.'
            
        }
    ]
    

    const productsBlocks = document.querySelector('.products-blocks');

    products.forEach(product => {
        productsBlocks.insertAdjacentHTML("beforeend", 
        `
        <div class="products-block">
            <img src="img/sets/${product.id}.png" alt="set">
            <div class="products-block-text">
                <p class="products-block-title">${product.name}</p>
                <p class="products-block-price">${product.price}𐔷</p>
            </div>
            <button onclick="addCart(${product.id})" class="products-block-cart">
                <p>Добавить</p>
                <img src="img/icons/cart.svg" alt="cart">
            </button>
            <div class="block-counter">
                <button class="block-minuscart counter">-<button>
                <button class="block-addcart counter">+<button>
            </div>
        </div>
        `
        );
    });

    let cart = [

    ]
    
    function addCart (id) {
        const product = products.find(product => product.id === id)
       if (cart.find(product => product.id === id) === undefined) {
            cart.push(product)
            const productIndex = cart.indexOf(product)
            cart[productIndex]['count'] = 1
       } else {
            const productIndex = cart.indexOf(product)
            cart[productIndex]['count'] = cart[productIndex]['count'] + 1
            console.log(cart)
       }
    }
    
    
    
    const addCartButtons = document.querySelectorAll('.products-block-cart')
    
    addCartButtons.forEach(button => {
        button.addEventListener('click', e => {
            button.parentElement.classList.add('active')
        })
    })




const params = new URLSearchParams(tg.initData);
const userParam = params.get('user');
const user = JSON.parse(userParam);
const username = user.username; 


let usercard = document.querySelector(".header-container");
usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">${username}</p>`);

