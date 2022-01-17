/*Открываем и закрываем попап*/
let profileRedactionButton  = document.querySelector('.profile__redacted-button');
let popUp = document.querySelector('.pop-up');
let popUpClose = document.querySelector('.pop-up__closed');

function openPopUp(){popUp.classList.add('pop-up_opened')}
profileRedactionButton.addEventListener('click', openPopUp);

function closePopUp(){popUp.classList.remove('pop-up_opened')}
popUpClose.addEventListener('click', closePopUp);

popUp.addEventListener('click', function(event) {
    if(event.target === event.currentTarget){closePopUp()
    }
});

/*Присваеваем значения из профиля*/

let popUpInputName = document.querySelector('.pop-up__input-name');
let profileName = document.querySelector('.profile__name');
let popUpInputNameValue=profileName.textContent;

popUpInputName.setAttribute('value', popUpInputNameValue);

let popUpInputDescription = document.querySelector('.pop-up__input-description');
let profileDescription = document.querySelector('.profile__description');
let popUpInputDescriptionValue=profileDescription.textContent;

popUpInputDescription.setAttribute('value', popUpInputDescriptionValue);

/*Редактируем имя и информацию о себе*/

let popUpForm = document.querySelector('.pop-up__form');
popUpForm.addEventListener('submit', function(evt){
    evt.preventDefault(); 
    let newName = document.querySelector('.pop-up__input-name').value;
    profileName.textContent = newName;
    let newDescription = document.querySelector('.pop-up__input-description').value;
    profileDescription.textContent = newDescription;
    closePopUp()
})





