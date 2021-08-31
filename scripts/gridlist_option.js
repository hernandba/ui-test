let cardsContainer = document.querySelector('.cards-container');
let dropbtn = document.querySelector('.dropbtn');
let listoption = document.querySelector('.list-option');
let gridoption = document.querySelector('.grid-option');

listoption.addEventListener('click', event => {
    dropbtn.innerText = 'List';
    cardsContainer.classList.remove('cards-grid');
    event.stopPropagation();
})

gridoption.addEventListener('click', event => {
    dropbtn.innerText = 'Grid';
    cardsContainer.classList.add('cards-grid');
    event.stopPropagation();
})