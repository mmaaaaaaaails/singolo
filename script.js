
const MENU = document.getElementById('menu');

MENU.addEventListener('click', event => {
    MENU.querySelectorAll('li').forEach(element => element.classList.remove('nav__item__link--active'));
    event.target.parentNode.classList.add('nav__item__link--active');
});




MENU.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();

        document.querySelector(event.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.addEventListener('scroll', onScroll);

function onScroll(event){
    const CURRENT = window.scrollY;
    const SECTIONS = document.querySelectorAll('section');
    const MENU_LIST = document.querySelectorAll('.nav__item__link');

    SECTIONS.forEach((element) => {
        if(element.offsetTop - 95 <= CURRENT && (element.offsetTop + element.offsetHeight - 95) > CURRENT){
            MENU_LIST.forEach((li) => {
                li.classList.remove('nav__item__link--active');
                if(element.getAttribute('id') === li.querySelector('.nav__item__link a').getAttribute('href').substring(1)){
                    li.classList.add('nav__item__link--active');
                }
            });
        }
    });
}

// slider

let items = document.querySelectorAll('.item');
let current_item = 0;
let isEnabled = true;

function changeCurrentItem(n){
    current_item = (n + items.length) % items.length;
}

function hideItem(direction){
    isEnabled = false;
    items[current_item].classList.add(direction);
    items[current_item].addEventListener('animationend', function(){
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    items[current_item].classList.add('next', direction);
    items[current_item].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function previousItem(n){
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n){
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

document.querySelector('.slider__arrow--right').addEventListener('click',function(){
    if (isEnabled){
        previousItem(current_item);
    }
});

document.querySelector('.slider__arrow--left').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(current_item);
    }
});


const SCREEN_VERTIKAL = document.querySelector('.phone__vertikal');

SCREEN_VERTIKAL.addEventListener('click', () => {
    SCREEN_VERTIKAL.classList.toggle('phone__vertical--screen');
});

const SCREEN_HORIZONTAL = document.querySelector('.phone__horizontal');

SCREEN_HORIZONTAL.addEventListener('click', () => {
    SCREEN_HORIZONTAL.classList.toggle('phone__horizontal--screen');
});

// portfolio

const PORTFOLIO_ITEM = document.getElementById('portfolio__item');

PORTFOLIO_ITEM.addEventListener('click', event => {
    PORTFOLIO_ITEM.querySelectorAll('img').forEach(el => el.classList.remove('portfolio__image--active'));
    event.target.classList.add('portfolio__image--active');
});

const TAB = document.getElementById('tab');

TAB.addEventListener('click', event => {
    TAB.querySelectorAll('button').forEach(el => el.classList.remove('portfolio__topic__btn--active'));
    event.target.classList.add('portfolio__topic__btn--active');
    const PORTFOLIO_IMAGE = PORTFOLIO_ITEM.querySelectorAll('img');
    PORTFOLIO_ITEM.insertAdjacentElement('afterbegin', PORTFOLIO_IMAGE[PORTFOLIO_IMAGE.length -1]);
});

// form

const FORM = document.querySelector('.form');
const MODAL = document.querySelector('.modal');
const MESSAGE_SUBJECT = document.querySelector('.message__subject');
const MESSAGE_DESCRIPTION = document.querySelector('.message__description');

FORM.addEventListener('submit', event => {
    event.preventDefault();
    MODAL.classList.remove('hidden');
    const SUBJECT = document.querySelector('#subject').value;
    const DESCRIPTION = document.querySelector('#description').value;
    if (SUBJECT !== '') {
        MESSAGE_SUBJECT.textContent = 'Subject: ' + SUBJECT;
    } else {
        MESSAGE_SUBJECT.textContent = 'Subject is empty';
    }
    if (DESCRIPTION !== '') {
        MESSAGE_DESCRIPTION.textContent = 'Description: ' + DESCRIPTION;
    } else {
        MESSAGE_DESCRIPTION.textContent = 'Descriprtion is empty';
    }
});

const MESSAGE_CLOSE = document.querySelector('.message__close');

MESSAGE_CLOSE.addEventListener('click', () => {
    MODAL.classList.add('hidden');
    FORM.reset();
});

   // hamburger

const HAMBURGER_MENU = document.querySelector('.hamburger');
const HAMBURGER_NAV = document.querySelector('.nav__item');

HAMBURGER_MENU.addEventListener('click', () => {
        HAMBURGER_MENU.classList.toggle('hamburger__rotate--active');
        HAMBURGER_NAV.classList.toggle('hamburger--active');
});

document.addEventListener('click', (event) => {
    if (event.target.closest('.nav__item')) {
        HAMBURGER_MENU.classList.remove('hamburger__rotate--active');
        HAMBURGER_NAV.classList.remove('hamburger--active');
    }
});
