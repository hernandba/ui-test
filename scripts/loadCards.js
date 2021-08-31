let rothumbData = localStorage.getItem('rothumbData');

if(!rothumbData){
    console.log('no hay data');
    getData('assets/data.json').then(data => {
        localStorage.setItem('rothumbData', JSON.stringify(data));
        data.forEach(element => {
            cardsContainer.appendChild(createCard(element));
        });
    })
}else{
    console.log('si hay data');
    JSON.parse(rothumbData).forEach(element => {
        cardsContainer.appendChild(createCard(element));
    })
}