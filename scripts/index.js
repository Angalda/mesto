import  {Card}  from './Card.js';
import {FormValidator} from './FormValidator.js';

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
const popUpInputName = document.querySelector('.pop-up__input_value_name');
const profileName = document.querySelector('.profile__name');
const popUpInputDescription = document.querySelector('.pop-up__input_value_description');
const profileDescription = document.querySelector('.profile__description');
const popUpFormProfile = document.querySelector('.pop-up__form_profle');
const popUpFormCards = document.querySelector('.pop-up__form-cards');
const cardsList = document.querySelector('.photo-cards__list');
const addButton = document.querySelector('.profile__add-button');
const popUpCards = document.querySelector('.pop-up_type_cards');
const popUpSubmitFormCard = document.querySelector('.pop-up__submit-form_card');
const popUpInputValueCardTitle = document.querySelector('.pop-up__input_value_card-title');
const popUpInputValueCardLink = document.querySelector('.pop-up__input_value_card-link');
export const popUpPhoto = document.querySelector('.pop-up__photo');
export const popUpTitlePhotoView = document.querySelector('.pop-up__title-photo-view');
const popups = document.querySelectorAll('.pop-up');
export const popUpPhotoView = document.querySelector('.pop-up_type_photo-view');


const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit-form',
    inactiveButtonClass: 'pop-up__submit-form_disabled',
    inputErrorClass: 'pop-up__input_warning',
    errorClass: 'pop-up__span-error'
};

const editProfileValidator = new FormValidator(validationConfig, popUpFormProfile);
const addCardValidator = new FormValidator(validationConfig, popUpFormCards);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

export function openPopUp(anyPopUp) {
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

    const newUserCard = new Card(item, '.template');
    const card = newUserCard.generateCard();
    
    return card;
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
    popUpSubmitFormCard.setAttribute("disabled", "disabled");
}
//Открываем по клику попап профиль
profileRedactionButton.addEventListener('click', function () {
    popUpInputName.value = profileName.textContent;
    popUpInputDescription.value = profileDescription.textContent;
    //editProfileValidator.disabledSubmitButton();
    openPopUp(popUpProfile);
});

popUpFormProfile.addEventListener('submit', saveProfileInfo);

// открываем по клику попап карточек
addButton.addEventListener('click', () => {
    //addCardValidator.disabledSubmitButton();
    openPopUp(popUpCards);

    addCardValidator.resetValidation();
    popUpFormCards.reset();
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

