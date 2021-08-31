let card = document.querySelector('.card');

function createCard(data) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.innerHTML = card.innerHTML;

    /* ---------------------------------- Image --------------------------------- */
    newCard.setAttribute('style', `background-image: url(${data.picture})`)

    /* ------------------------------ General info ------------------------------ */
    let newCardName = newCard.querySelector('.card_name');
    newCardName.innerText = data.name;
    newCard.querySelector('.card_description').innerText = data.description;

    let lastUpdatedDate = data.lastUpdated;
    updateCardLastUpdated(lastUpdatedDate, newCard);

    let category = data.category;
    newCard.querySelector('.card_category').innerText = category.charAt(0).toUpperCase() + category.slice(1);

    /* ---------------------------------- Votes --------------------------------- */
    let positive = data.votes.positive;
    let negative = data.votes.negative;

    updateVotesAndRulers(positive, negative, newCard);

    /* ---------------------------- Buttons functions --------------------------- */
    let cardDetailInfo = newCard.querySelector('.card_detail_info');
    let cardThanks = newCard.querySelector('.card_thanks');
    let upBtn = newCard.querySelector('.up-button');
    let downBtn = newCard.querySelector('.down-button');
    let voteNowBtn = newCard.querySelector('.votenow-button');
    let voteAgainBtn = newCard.querySelector('.voteagain-button');

    upBtn.addEventListener('click', event => {
        upBtn.classList.toggle('button-selected');
        downBtn.classList.remove('button-selected');
        event.stopPropagation();
    })

    downBtn.addEventListener('click', event => {
        downBtn.classList.toggle('button-selected');
        upBtn.classList.remove('button-selected');
        event.stopPropagation();
    })

    voteNowBtn.addEventListener('click', event => {
        if (upBtn.classList.contains('button-selected') || downBtn.classList.contains('button-selected')) {
            let dataToUpdate = JSON.parse(localStorage.getItem('rothumbData'));
            let index = dataToUpdate.findIndex(element => element.name == newCardName.innerText);

            if(upBtn.classList.contains('button-selected')){
                dataToUpdate[index].votes.positive += 1;
            }
            if(downBtn.classList.contains('button-selected')){
                dataToUpdate[index].votes.negative += 1;
            }
            updateVotesAndRulers(dataToUpdate[index].votes.positive, dataToUpdate[index].votes.negative, newCard);

            let date = new Date();
            dataToUpdate[index].lastUpdated = date.toISOString();
            updateCardLastUpdated(dataToUpdate[index].lastUpdated, newCard);

            localStorage.setItem('rothumbData', JSON.stringify(dataToUpdate));

            //Remove selected from up/down buttons
            upBtn.classList.remove('button-selected');
            downBtn.classList.remove('button-selected');
            //Hide all buttons
            upBtn.classList.add('d-none');
            downBtn.classList.add('d-none');
            voteNowBtn.classList.add('d-none');
            //Show vote-again
            voteAgainBtn.classList.remove('d-none');
            //Hide card detail info
            cardDetailInfo.classList.add('d-none');
            //Show card thanks
            cardThanks.classList.remove('d-none');
        }
        event.stopPropagation();
    })

    voteAgainBtn.addEventListener('click', event => {
        //Show up-down buttons
        upBtn.classList.remove('d-none');
        downBtn.classList.remove('d-none');
        //Hide vote-again
        voteAgainBtn.classList.add('d-none');
        //Show vote-now
        voteNowBtn.classList.remove('d-none');
        //Hide card thanks
        cardThanks.classList.add('d-none');
        //Show card detail info
        cardDetailInfo.classList.remove('d-none');

        event.stopPropagation();
    })

    return newCard;
}

function updateCardLastUpdated(date, card){
    let lastUpdate = new Date(date);
    let actualDate = new Date();
    let monthsAgo = (actualDate.getFullYear() - lastUpdate.getFullYear()) * 12;
    monthsAgo -= lastUpdate.getMonth();
    monthsAgo += actualDate.getMonth();
    monthsAgo <= 0 ? 0 : monthsAgo;

    if (monthsAgo > 1) {
        monthsAgo = monthsAgo + ' months'
    } else {
        monthsAgo = monthsAgo + ' month'
    }

    card.querySelector('.card_updated').innerText = monthsAgo;
}

function updateVotesAndRulers(positive, negative, card){
    let totalVotes = positive + negative;
    let positivePercentage = ((positive / totalVotes) * 100).toFixed(1);
    let negativePercentage = ((negative / totalVotes) * 100).toFixed(1);

    if (parseFloat(positivePercentage) > parseFloat(negativePercentage)) {
        card.querySelector('.card_indicator_up').classList.remove('d-none');
        card.querySelector('.card_indicator_up').classList.add('d-flex');

        card.querySelector('.card_indicator_down').classList.add('d-none');
    } else {
        card.querySelector('.card_indicator_down').classList.remove('d-none');
        card.querySelector('.card_indicator_down').classList.add('d-flex');

        card.querySelector('.card_indicator_up').classList.add('d-none');
    }

    card.querySelector('.pos_percentage').innerText = positivePercentage + '%';
    card.querySelector('.neg_percentage').innerText = negativePercentage + '%';
    card.querySelector('.card_ruler_pos').setAttribute('style', `width: ${positivePercentage+'%'}`);
    card.querySelector('.card_ruler_neg').setAttribute('width', `width: ${negativePercentage+'%'}`);
}