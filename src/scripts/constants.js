
export const initialCards = [
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

export const profileRedactionButton = document.querySelector('.profile__redacted-button');
export const popUpInputName = document.querySelector('.pop-up__input_value_name');
export const popUpInputDescription = document.querySelector('.pop-up__input_value_description');
export const popUpFormProfile = document.querySelector('.pop-up__form_profle');
export const popUpFormCards = document.querySelector('.pop-up__form-cards');
export const addButton = document.querySelector('.profile__add-button');

//Валидатор
export const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit-form',
    inactiveButtonClass: 'pop-up__submit-form_disabled',
    inputErrorClass: 'pop-up__input_warning',
    errorClass: 'pop-up__span-error'
};