import { initialCards, profileRedactionButton, popUpInputName, popUpInputDescription,
popUpFormProfile, popUpFormCards, addButton, validationConfig, profileName, profileAvatar, profileDescription} from '../scripts/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Popup} from '../scripts/components/Popup.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js'
import '../pages/index.css';


const editProfileValidator = new FormValidator(validationConfig, popUpFormProfile);
const addCardValidator = new FormValidator(validationConfig, popUpFormCards);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();



//Сохраняем информацию в профиле
const saveProfileInfo = (data) => {
    
    const { name, description } = data;
    userInfo.setUserInfo(name, description);
    //Редактирование профиля на сервере!!!
    api.postUserInfo(name, description);
    editProfilePopup.close();
}

const avatar = document.querySelector('.profile__avatar');

const saveUserInfo = (data) => {
    avatar.src = data.link;
    api.changeAvatar(data);
    editUserPopup.close();

    
}


//создание карточки
function createCard(item) {
    const newUserCard = new Card(item, '.template', () => imagePopup.open(item.name, item.link), deleteCard, addLike, removeLike);
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
        //items: initialCards,
        renderer: rendererCard
    },
    '.photo-cards__list'
);

//Попапы 
const imagePopup = new PopupWithImage('.pop-up_type_photo-view');
const addCardPopup = new PopupWithForm('.pop-up_type_cards', handleCardFormSubmit);
const editProfilePopup = new PopupWithForm('.pop-up_type_profile', saveProfileInfo);
const editUserPopup = new PopupWithForm('.pop-up_type_avatar', saveUserInfo);
const deletePopup = new Popup ('.pop-up_type_delete',  saveUserInfo);
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '2ee8c513-1056-4e42-b03f-51f9bdfbc616',
      'Content-Type': 'application/json'
    }
  })

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
editUserPopup.setEventListeners();
deletePopup.setEventListeners();


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
    
    card.querySelector('.photo-card__delete').classList.add('photo-card__delete_visible');
    //Добавление данных новой карточки на сервер !!!
    api.postCardInfo(data['card-title'], data['card-link']);
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

//Получаем с сервера информацию о пользователе и отображаем на странице!!!
function servUserInfo () {
    api.pullUserInfo()
    .then((result) => {
    profileName.textContent = result.name;
    profileAvatar.src = result.avatar;
    profileDescription.textContent = result.about;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

servUserInfo ()


//Загрузка данных для карточек с сервера + отображение!!!
function pullCardInfo() {
    api.getCardInfo()
    .then((result) => {
        //const arr = result;
        sectionCards.renderItems(result)

    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
} 

 pullCardInfo()


//Удаление карточки с сервера!!!
function deleteCard (idCard) {
    api.deleteCard(idCard);
}

//Постановка и снятие лайка на сервере!!!

function addLike(idCard, likes) {
    api.addLike(idCard, likes);
}

function removeLike(idCard, likes) {
    api.removeLike(idCard, likes)
}


//Редактируем аватар
const profileAvatarEdit = document.querySelector('.profile__avatar-edit');

profileAvatarEdit.addEventListener('mouseenter', () => {
    profileAvatarEdit.classList.add('profile__avatar-edit_hover')
})

profileAvatarEdit.addEventListener('mouseleave', () => {
    profileAvatarEdit.classList.remove('profile__avatar-edit_hover');
})

profileAvatarEdit.addEventListener('click', () => editUserPopup.open());


