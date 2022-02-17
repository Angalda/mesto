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
const popUpProfile = document.querySelector('.pop-up_type_profile');
const profileCloseBtn = popUpProfile.querySelector('.pop-up__closed');
const popUpInputName = document.querySelector('.pop-up__input_value_name');
const profileName = document.querySelector('.profile__name');
const popUpInputDescription = document.querySelector('.pop-up__input_value_description');
const profileDescription = document.querySelector('.profile__description');
const popUpFormProfile = document.querySelector('.pop-up__form_profle');
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
const popups = document.querySelectorAll('.pop-up')
const popUpArr = Array.from(document.querySelectorAll('.pop-up'));

function openPopUp(anyPopUp) {
    anyPopUp.classList.add('pop-up_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopUp(anyPopUp) {
    anyPopUp.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.pop-up_opened');
        closePopUp(openedPopup);
    }
}

function saveProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popUpInputName.value;
    profileDescription.textContent = popUpInputDescription.value;
    closePopUp(popUpProfile);
}

function createCard(item) {
    const newItem = template.cloneNode(true);
    newItem.querySelector('.photo-card__title').innerText = item.name;
    const photo = newItem.querySelector('.photo-card__img');
    photo.src = item.link;
    photo.alt = item.name;
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
    popUpFormCards.reset();
    popUpSubmitFormCard.classList.add('pop-up__submit-form_disabled');
    popUpSubmitFormCard.setAttribute("disabled", "disabled");
}

// лайки, удаление, просмотр
function addListeners(el) {
    el.querySelector('.photo-card__like').addEventListener('click', handleLike);
    el.querySelector('.photo-card__delete').addEventListener('click', handleDelete);
    el.querySelector('.photo-card__img').addEventListener('click', handleView);
}

function handleLike(event) {
    event.target.classList.toggle('photo-card__like_active');
}

function handleDelete(event) {
    event.target.closest('.photo-card').remove();
}

function handleView(event) {
    popUpPhoto.src = event.target.src;
    popUpPhoto.alt = event.target.alt;
    popUpTitlePhotoView.textContent = event.target.alt;
    openPopUp(popUpPhotoView);
}

profileRedactionButton.addEventListener('click', function () {
    popUpInputName.value = profileName.textContent;
    popUpInputDescription.value = profileDescription.textContent;
    openPopUp(popUpProfile);
});

popUpFormProfile.addEventListener('submit', saveProfileInfo);

// открываем попап
addButton.addEventListener('click', function () {
    openPopUp(popUpCards)
});

popUpFormCards.addEventListener('submit', saveInfoCard);

//закрытие попапов
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('pop-up_opened')) {
            closePopUp(popup)
        }
        if (evt.target.classList.contains('pop-up__closed')) {
            closePopUp(popup)
        }
    })
})