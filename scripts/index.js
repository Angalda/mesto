
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
    profileName.textContent = popUpInputName.value;
    profileDescription.textContent = popUpInputDescription.value;
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
const template = document.querySelector('.template').content;
const cardsList = document.querySelector('.photo-cards__list');






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

  function render () {
    initialCards.forEach(renderItem)
  }

  function renderItem (item) {
      const newItem = template.cloneNode(true);
      newItem.querySelector('.photo-card__title').innerText = item.name;
      newItem.querySelector('.photo-card__img').src = item.link;

      cardsList.appendChild(newItem)

  }
  
  render()