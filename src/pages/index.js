import {
    profileRedactionButton, popUpInputName, popUpInputDescription,
    popUpFormProfile, popUpFormCards, popUpFormAvatar, addButton, validationConfig
} from '../scripts/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';

import { UserInfo } from '../scripts/components/UserInfo.js';
import { api } from '../scripts/components/Api.js'
import '../pages/index.css';

let userId;
const initialArray = [api.getProfile(), api.getCardInfo()]

Promise.all(initialArray)
    .then(
        ([userData, cardList]) => {
            //получаем информацию о пользователе с сервера
            userInfo.setUserInfo(userData.name, userData.about);
            userInfo.setUserAvatar(userData.avatar);

            userId = userData._id;

            //загрузка карточек с сервера
            sectionCards.renderItems(cardList);

        })
    .catch(console.log);

const editProfileValidator = new FormValidator(validationConfig, popUpFormProfile);
const addCardValidator = new FormValidator(validationConfig, popUpFormCards);
const editAvatar = new FormValidator(validationConfig, popUpFormAvatar);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatar.enableValidation();

//Сохраняем информацию в профиле
const saveProfileInfo = (data) => {
    editProfilePopup.renderLoading() 
    const { name, description } = data;
    //Редактирование профиля на сервере!!!
    api.postUserInfo(name, description)
       
        .then(() => {
            userInfo.setUserInfo(name, description)
        })

        .then(()=>{
            editProfilePopup.close()
        })

        .catch(console.log)

        .finally(() => {
           editProfilePopup.renderLoadingFinish()
        });

}

//меняем аватар
//const avatar = document.querySelector('.profile__avatar');

const saveUserInfo = (data) => {
    editUserPopup.renderLoading();
   // avatar.src = data.link;
    api.changeAvatar(data)
    .then(()=>{userInfo.setUserAvatar(data.link)})

    .then(()=>{
        editUserPopup.close();
    })
    .catch(console.log)
    .finally(() => {
        editUserPopup.renderLoadingFinish();
    });
    
}


//создание карточки
function createCard(item) {
    const newUserCard = new Card(item, userId, '.template',
        () => imagePopup.open(item.name, item.link),
        (id) => {
            deletePopup.open();
            deletePopup.changeSubmitHandler(() => {
                
                api.deleteCard(id)
                    .then((res) => {
                        console.log(res);
                        newUserCard.deleteCard();
                    })
                    .then(()=>{
                        deletePopup.close();
                    })
                    .catch(console.log)
                    
            })
        },

        addLike, removeLike);

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
        renderer: rendererCard
    },
    '.photo-cards__list'
);

//Попапы 
const imagePopup = new PopupWithImage('.pop-up_type_photo-view');
const addCardPopup = new PopupWithForm('.pop-up_type_cards', handleCardFormSubmit);
const editProfilePopup = new PopupWithForm('.pop-up_type_profile', saveProfileInfo);
const editUserPopup = new PopupWithForm('.pop-up_type_avatar', saveUserInfo);
const deletePopup = new PopupWithForm('.pop-up_type_delete', saveUserInfo);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
editUserPopup.setEventListeners();
deletePopup.setEventListeners();

//Редактируем аватар
const profileAvatarEdit = document.querySelector('.profile__avatar-edit');

profileAvatarEdit.addEventListener('mouseenter', () => {
    profileAvatarEdit.classList.add('profile__avatar-edit_hover')
})

profileAvatarEdit.addEventListener('mouseleave', () => {
    profileAvatarEdit.classList.remove('profile__avatar-edit_hover');
})

profileAvatarEdit.addEventListener('click', () => {
    editAvatar.resetValidation();
    //editAvatar.disabledSubmitButton();
    editUserPopup.open()
});


const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__description',
    profileAvatar: '.profile__avatar'
})

//Добавление новой карточки
function handleCardFormSubmit(data) {
    addCardPopup.renderLoading();
    api.postCardInfo(data['card-title'], data['card-link'])
        .then((result) => sectionCards.addItem(createCard(result)))
        .then(()=>{
            addCardPopup.close();
        })
        .catch(console.log)
        .finally(() => {
            addCardPopup.renderLoadingFinish();
        });
    
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

//Постановка и снятие лайка на сервере!!!

function addLike(idCard, sumLikes, element) {
    api.addLike(idCard, sumLikes)
    .then((result) => {        
        sumLikes.innerText = result.likes.length;
        element.classList.add('photo-card__like_active');
    })
    
}

function removeLike(idCard, sumLikes, element) {
    api.removeLike(idCard, sumLikes)
    .then((result) => {
        sumLikes.innerText = result.likes.length;
        element.classList.remove('photo-card__like_active');
    }) 
    
}
