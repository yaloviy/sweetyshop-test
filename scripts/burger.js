const burgerIcon = document.querySelector('.header-burger')
const burger = document.querySelector('.burger')
const burgerClose = document.querySelector('.burger-close')

burgerIcon.addEventListener('click', e => {
    burger.classList.add('active')
})


burgerClose.addEventListener('click', e => {
    burger.classList.remove('active')
})