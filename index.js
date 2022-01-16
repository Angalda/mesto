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

/*Присваеваем плейсхолдеру значения из профиля*/

let popUpInputName = document.querySelector('.pop-up__input-name');
let profileName = document.querySelector('.profile__name');
let popUpInputNameValue=profileName.textContent;

popUpInputName.setAttribute('placeholder', popUpInputNameValue);


let popUpInputDescription = document.querySelector('.pop-up__input-description');
let profileDescription = document.querySelector('.profile__description');
let popUpInputDescriptionValue=profileDescription.textContent;

popUpInputDescription.setAttribute('placeholder', popUpInputDescriptionValue);

/*Редактируем имя и информацию о себе*/
let newName = document.querySelector('.pop-up__input-name').value;

let popUpForm = document.querySelector('.pop-up__form');
popUpForm.addEventListener('submit', function(){profileName.textContent=newName;
console.log(profileName.textContent)})






