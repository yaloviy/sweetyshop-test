const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('element-animation__show')
        } else {
            // entry.target.classList.remove('element-animation__show')
        }
    })
})


document.querySelectorAll('.element-animation').forEach(element => {observer.observe(element)});