
let profileRedactionButton = document.querySelector('.profile__redacted-button');
let popUp = document.querySelector('.pop-up');
let popUpClose = document.querySelector('.pop-up__closed');
let popUpInputName = document.querySelector('.pop-up__input_value_name');
let profileName = document.querySelector('.profile__name');
let popUpInputDescription = document.querySelector('.pop-up__input_value_description');
let profileDescription = document.querySelector('.profile__description');
let popUpForm = document.querySelector('.pop-up__form');


function openPopUp() { popUp.classList.add('pop-up_opened') }

function closePopUp() { popUp.classList.remove('pop-up_opened') }

function saveInfo(evt) {
    evt.preventDefault();
    let newName = popUpInputName.value;
    profileName.textContent = newName;
    let newDescription = popUpInputDescription.value;
    profileDescription.textContent = newDescription;
    closePopUp()
}

profileRedactionButton.addEventListener('click', openPopUp,
    popUpInputName.value = profileName.textContent,
    popUpInputDescription.value = profileDescription.textContent
);

popUpClose.addEventListener('click', closePopUp);

popUpForm.addEventListener('submit', saveInfo);

/*
Закрываем попап по клику рядом с ним
popUp.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
        closePopUp()
    }
});
*/