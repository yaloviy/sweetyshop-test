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
        <div class="products-block" id="${product.id}">
            <img src="img/sets/${product.id}.png" alt="set">
            <div class="products-block-text">
                <p class="products-block-title">${product.name}</p>
                <p class="products-block-price">${product.price}₽</p>
            </div>
            <button onclick="addCart(${product.id})" class="products-block-cart">
                <p>Добавить</p>
                <img src="img/icons/cart.svg" alt="cart">
            </button>
            <div class="block-counter">
                <button onclick="removeCart(${product.id})" class="block-minuscart counter">-</button>
                <button onclick="addCart(${product.id})" class="block-addcart counter">+</button>
            </div>
            <div class="block-quantity">
                <p class="block-quantity-p"></p>
            </div>

        </div>
        `
        );
    });

    const Productblock = document.querySelectorAll('.products-block') 
    const addCartButtons = document.querySelectorAll('.products-block-cart')
    
    addCartButtons.forEach(button => {
        button.addEventListener('click', e => {
            button.parentElement.classList.add('active')
        })
    })




    let cart = [

    ]


    
    function  mainButtonShowTG () {
        setTimeout(() => {
            if (cart.length === 0) {
                tg.MainButton.hide();
                return;
            }
        
            const buttonText = `Оплатить ${cart.reduce((sum, product) => sum + product.price * product.count, 0)}₽`;

            tg.MainButton.setParams({
                text: buttonText,
                has_shine_effect: true,
                is_progress_visible: true,
              });

            if (!tg.MainButton.isVisible) {
                tg.MainButton.show();
            }
        }, 100)
    }
    

    
    function addCart (id) {
        const product = products.find(product => product.id === id)
       if (cart.find(product => product.id === id) === undefined) {
            cart.push(product)
            const productIndex = cart.indexOf(product)
            cart[productIndex]['count'] = 1
            quantity(id)
            mainButtonShowTG()
       } else {
            const productIndex = cart.indexOf(product)
            cart[productIndex]['count'] = cart[productIndex]['count'] + 1
            quantity(id)
            mainButtonShowTG()
       }
    }
    
    



    function removeCart (id) {
        const product = products.find(product => product.id === id)
        productInCart = cart.find(product => product.id === id)
        const productIndex = cart.indexOf(product)
        if (productInCart.count === 1) {
            cart.splice(productIndex, 1);
            document.getElementById(id).classList.remove('active')
            mainButtonShowTG()
        } else {
            productInCart['count'] = productInCart['count'] - 1
            quantity(id)
            mainButtonShowTG()
        }

    }

    function quantity (id) {
        const block = document.getElementById(id)
        const quantity = block.querySelector('.block-quantity-p')
        product = cart.find(product => product.id === id)
        quantity.textContent = `${product['count']}`
    }


    const user = tg.initDataUnsafe.user;
    const usercard = document.querySelector(".header-container");

    if (user) {
        const username = user.username 
            ? `@${user.username}` 
            : user.first_name || 'Покупатель';
        
        usercard.insertAdjacentHTML("afterbegin", `<p class="telegram-username">${username}</p>`);
    }


    
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (cart.length === 0) {
        Telegram.WebApp.showAlert("Корзина пуста! Добавьте товары.");
        return;
    }

    const orderData = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        count: item.count
    }));

    Telegram.WebApp.sendData(JSON.stringify(orderData));
    Telegram.WebApp.close();  
});