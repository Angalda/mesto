import { initialCards, profileRedactionButton, popUpInputName, popUpInputDescription,
popUpFormProfile, popUpFormCards, addButton, validationConfig } from '../scripts/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import '../pages/index.css';


const editProfileValidator = new FormValidator(validationConfig, popUpFormProfile);
const addCardValidator = new FormValidator(validationConfig, popUpFormCards);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();



//Сохраняем информацию в профиле
const saveProfileInfo = (data) => {
    const { name, description } = data;
    userInfo.setUserInfo(name, description);
    editProfilePopup.close();
}


//создание карточки
function createCard(item) {
    const newUserCard = new Card(item, '.template', () => imagePopup.open(item.name, item.link));
    const card = newUserCard.generateCard();

    return card;
}


const rendererCard = (data) => {
    const card = createCard(data);
    sectionCards.addItem(card)
}

//Отрисовываем все карточки и добавляем на страницу с помощью классов
const sectionCards = new Section(
    {
        items: initialCards,
        renderer: rendererCard
    },
    '.photo-cards__list'
);

sectionCards.renderItems();


//Попапы 
const imagePopup = new PopupWithImage('.pop-up_type_photo-view');
const addCardPopup = new PopupWithForm('.pop-up_type_cards', handleCardFormSubmit);
const editProfilePopup = new PopupWithForm('.pop-up_type_profile', saveProfileInfo);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();


const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__description'
})


//Добавление новой карточки
function handleCardFormSubmit(data) {
    const card = createCard({
        name: data['card-title'],
        link: data['card-link']
    });
    sectionCards.addItem(card);
    addCardPopup.close();
}

// открываем по клику попап карточек
addButton.addEventListener('click', () => {
    addCardValidator.resetValidation();
    addCardPopup.open();
});


//Открываем по клику попап профиль
profileRedactionButton.addEventListener('click', function () {
    const data = userInfo.getUserInfo();
    popUpInputName.value = data.name;
    popUpInputDescription.value = data.description;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});


