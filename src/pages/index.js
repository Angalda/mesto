import { initialCards, profileRedactionButton, popUpInputName, popUpInputDescription,
popUpFormProfile, popUpFormCards, popUpFormAvatar, addButton, validationConfig, profileName, profileAvatar, profileDescription} from '../scripts/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Popup} from '../scripts/components/Popup.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { api } from '../scripts/components/Api.js'
import '../pages/index.css';

api.getProfile();
api.getCardInfo();

let userId;
const initialArray = [api.getProfile(), api.getCardInfo()]

Promise.all(initialArray)
    .then (
        ([res, cardList]) => {
        //получаем информацию о пользователе с сервера
        
        userInfo.setUserInfo(res.name, res.about);
        userInfo.setUserAvatar(res.avatar);

        userId = res._id;

        //загрузка карточек с сервера
        sectionCards.renderItems(cardList);

    })
    .catch(console.log);

    api.getProfile();
    api.getCardInfo();

const editProfileValidator = new FormValidator(validationConfig, popUpFormProfile);
const addCardValidator = new FormValidator(validationConfig, popUpFormCards);
const editAvatar =  new FormValidator (validationConfig, popUpFormAvatar);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatar.enableValidation();



//Сохраняем информацию в профиле
const saveProfileInfo = (data) => {
    
    const { name, description} = data;
    //Редактирование профиля на сервере!!!
    api.postUserInfo(name, description)
    .then(() => {userInfo.setUserInfo(name, description);
    editProfilePopup.close();
    }) 
}


//меняем аватар
const avatar = document.querySelector('.profile__avatar');

const saveUserInfo = (data) => {
    avatar.src = data.link;
    api.changeAvatar(data);
    editUserPopup.close();

}


//создание карточки
function createCard(item) {
    const newUserCard = new Card(item, userId, '.template', 
    () => imagePopup.open(item.name, item.link), 
    (id) => {
        deletePopup.open();
        deletePopup.changeSubmitHandler(() => {
            api.deleteCard(id)
            .then((res) =>{
                newUserCard.deleteCard();
                deletePopup.close();
            })
        
        })
    }, 
    //(idCard) => api.deleteCard(idCard), 
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
const deletePopup = new PopupWithForm ('.pop-up_type_delete', saveUserInfo);


imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
editUserPopup.setEventListeners();
deletePopup.setEventListeners();


const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__description',
    profileAvatar: '.profile__avatar'
})


//Добавление новой карточки
function handleCardFormSubmit(data) {
    api.postCardInfo(data['card-title'], data['card-link'])
    .then((result) => sectionCards.addItem(createCard(result)))

    
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

profileAvatarEdit.addEventListener('click', () => {
    editAvatar.resetValidation();
    editAvatar.disabledSubmitButton();
    editUserPopup.open()});




//Получаем с сервера информацию о пользователе и отображаем на странице!!!
/*function servUserInfo () {
    api.getProfile()
    .then((result) => {
    profileName.textContent = result.name;
    profileAvatar.src = result.avatar;
    profileDescription.textContent = result.about;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}*/




//Загрузка данных для карточек с сервера + отображение!!!
/*function pullCardInfo() {
    api.getCardInfo()
    .then((result) => {
        //const arr = result;
        sectionCards.renderItems(result)

    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
} 

 pullCardInfo()*/

 //const popupDelete = document.querySelector('.pop-up_type_delete');
 
 /*function handleDeleteOk (){
    api.deleteCard (idCard)
 }*/






 /*function handleDelete() {
    
    popupDelete.classList.add('pop-up_opened');
}*/
   

/*
//Удаление карточки с сервера!!!
function deleteCard(idCard) {
    api.deleteCard(idCard);
    console.log(idCard);
}
*/

    
    