const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileRedactionButton = document.querySelector('.profile__redacted-button');
const popUp = document.querySelector('.pop-up');
const popUpProfile = document.querySelector('.pop-up_type_profile');
const popUpClose = document.querySelector('.pop-up__closed');
const popUpInputName = document.querySelector('.pop-up__input_value_name');
const profileName = document.querySelector('.profile__name');
const popUpInputDescription = document.querySelector('.pop-up__input_value_description');
const profileDescription = document.querySelector('.profile__description');
const popUpForm = document.querySelector('.pop-up__form');
const popUpFormCards = document.querySelector('.pop-up__form-cards');
const template = document.querySelector('.template').content;
const cardsList = document.querySelector('.photo-cards__list');
const addButton = document.querySelector('.profile__add-button');
const popUpCards = document.querySelector('.pop-up_type_cards');
const popUpClosedCard = document.querySelector('.pop-up__closed_card');
const popUpSubmitFormCard = document.querySelector('.pop-up__submit-form_card');
const popUpInputValueCardTitle = document.querySelector('.pop-up__input_value_card-title');
const popUpInputValueCardLink = document.querySelector('.pop-up__input_value_card-link');
const popUpPhoto = document.querySelector('.pop-up__photo');
const popUpPhotoView = document.querySelector('.pop-up_type_photo-view');
const popUpTitlePhotoView = document.querySelector('.pop-up__title-photo-view');
const popUpClosedPhotoView = document.querySelector('.pop-up__closed_photo-view');

function openPopUp(anyPopUp) { anyPopUp.classList.add('pop-up_opened') }
function closePopUp(anyPopUp) { anyPopUp.classList.remove('pop-up_opened') }



function saveInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popUpInputName.value;
    profileDescription.textContent = popUpInputDescription.value;
    closePopUp(popUpProfile);
}

function createCard(item) {
    const newItem = template.cloneNode(true);
    newItem.querySelector('.photo-card__title').innerText = item.name;
    newItem.querySelector('.photo-card__img').src = item.link;
    newItem.querySelector('.photo-card__img').alt = item.name;
    addListeners(newItem);
    return (newItem);
}

function render() {
    initialCards.forEach(function (element) {
        const card = createCard(element);
        cardsList.appendChild(card);
    });
}

render()

// добавляем карточку
function saveInfoCard(evt) {
    evt.preventDefault();
    const newCard = {};
    newCard.name = popUpInputValueCardTitle.value;
    newCard.link = popUpInputValueCardLink.value;
    cardsList.prepend(createCard(newCard));
    closePopUp(popUpCards);
}

// лайки, удаление, просмотр
function addListeners(el) {
    el.querySelector('.photo-card__like').addEventListener('click', handleLike);
    el.querySelector('.photo-card__delete').addEventListener('click', handleDelete);
    el.querySelector('.photo-card__img').addEventListener('click', handleView);
}

function handleLike(event) {
    event.target.closest('.photo-card__like').classList.toggle('photo-card__like_active');
}

function handleDelete(event) {
    event.target.closest('.photo-card').remove();
}

function handleView(event) {
    popUpPhoto.src = event.target.closest('.photo-card__img').src;
    popUpPhoto.alt = event.target.nextElementSibling.textContent;
    popUpTitlePhotoView.textContent = event.target.nextElementSibling.textContent;
    openPopUp(popUpPhotoView);
}

profileRedactionButton.addEventListener('click', function () {
    openPopUp(popUpProfile);
    popUpInputName.value = profileName.textContent;
    popUpInputDescription.value = profileDescription.textContent;
});

popUpClose.addEventListener('click', function () { closePopUp(popUpProfile) });
popUpForm.addEventListener('submit', saveInfo);

// открываем и закрываем попап 2
addButton.addEventListener('click', function () {
    popUpFormCards.reset();
    openPopUp(popUpCards)
});
popUpClosedCard.addEventListener('click', function () { closePopUp(popUpCards) });

popUpSubmitFormCard.addEventListener('click', saveInfoCard);

//закрыть окно просмотра фото
popUpClosedPhotoView.addEventListener('click', function () { closePopUp(popUpPhotoView) });

/*
Закрываем попап по клику рядом с ним
popUp.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
        closePopUp()
    }
});
*/