import  {Card}  from './Card.js';
import {FormValidator} from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

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

//Валидатор
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



//Сохраняем информацию в профиле
const saveProfileInfo = (data) => {
   const {name, description} = data;
   userInfo.setUserInfo(name, description);

    //profileName.textContent = name;
    //profileDescription.textContent = description;
    editProfilePopup.close();
}


//создание карточки
function createCard(item) {
    const newUserCard = new Card(item, '.template', () => imagePopup.open(item.name, item.link));
    const card = newUserCard.generateCard();

    return card;
}


const rendererCard = (data, wrap) => {
    const card = createCard(data);
    sectionCards.addItem(card)
}

//Отрисовываем все карточки и добавляем на страницу с помощью классов
const sectionCards  = new Section (
    {
        items: initialCards,
        renderer: rendererCard
    },
    '.photo-cards__list'
); 

sectionCards.renderItems();


//Попапы трех видов
const imagePopup = new PopupWithImage ('.pop-up_type_photo-view');
const addCardPopup = new PopupWithForm ('.pop-up_type_cards', handleCardFormSubmit);
const editProfilePopup = new PopupWithForm ('.pop-up_type_profile',  saveProfileInfo);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();


const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__description'
})

userInfo.setUserInfo(title, job)

 //Добавление новой карточки вместо saveInfoCard()
function handleCardFormSubmit (data) {
    const card = createCard({
        name: data['card-title'],
        link: data['card-link']
    });
    sectionCards.addItem(card);
    addCardPopup.close();


    //cardsList.prepend(createCard(newCard));
    //addCardPopup.close();
}


    // перебираем массив данных и вызываем функцию создания карточек
    /*function render() {
        initialCards.forEach(function (element) {
            const card = createCard(element);
            
            return card;
        });
    }*/

//render()



popUpFormProfile.addEventListener('submit', saveProfileInfo);



// открываем по клику попап карточек
addButton.addEventListener('click', () => {
    //addCardValidator.disabledSubmitButton();
    addCardPopup.open();

    addCardValidator.resetValidation();
    popUpFormCards.reset();
});


//Открываем по клику попап профиль

profileRedactionButton.addEventListener('click', function () {
    popUpInputName.value = profileName.textContent;
    popUpInputDescription.value = profileDescription.textContent;
    //editProfileValidator.disabledSubmitButton();
    editProfilePopup.open();
});



/*
// добавляем новую карточку
function saveInfoCard() {
    //evt.preventDefault();
    const newCard = {};
    newCard.name = popUpInputValueCardTitle.value;
    newCard.link = popUpInputValueCardLink.value;

    
    createCard(newCard);
    
    cardsList.prepend(newCard);

    addCardPopup.close();

    //popUpFormCards.reset();
    popUpSubmitFormCard.setAttribute("disabled", "disabled");
}
*/


//popUpFormCards.addEventListener('submit', saveInfoCard);*/

//закрытие попапов
/*popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('pop-up_opened')) {
            closePopUp(popup)
        }
        if (evt.target.classList.contains('pop-up__closed')) {
            closePopUp(popup)
        }
    })
})*/

/*
export function openPopUp(anyPopUp) {
    anyPopUp.classList.add('pop-up_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopUp(anyPopUp) {
    anyPopUp.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', closeByEscape);
}*/

/*function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.pop-up_opened');
        closePopUp(openedPopup);
    }
}*/

