// change navbar style on scroll

window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', 'window-scroll', window.scrollY > 0)
})


// show/hide faq
const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');

        //change icon
        const icon = faq.querySelector('.question_answer h4');
        if(icon.textContent === 'Развернуть') {
            icon.textContent = 'Свернуть'
        } else {
            icon.textContent = 'Развернуть'
        }
    })
})


// show/hide nav menu

const menu = document.querySelector(".nav_menu");
const menuBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener('click', () => {
    menu.style.display = "flex";
    closeBtn.style.display = "inline-block";
    menuBtn.style.display = "none";
})

//close nav menu

const closeNav = () => {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    menuBtn.style.display = "inline-block";
}

closeBtn.addEventListener('click', closeNav)
