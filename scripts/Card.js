/*import { popUpTitlePhotoView, popUpPhoto, popUpPhotoView } from './index.js';*/

export { Card }

class Card {
    constructor(data, template, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.name;
        this._template = template;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._template)
            .content
            .querySelector('.photo-card')
            .cloneNode(true);

        // вернём DOM-элемент карточки
        return cardElement;
    }

    generateCard() {
        this._newItem = this._getTemplate();
        
        this._elementTitle = this._newItem.querySelector('.photo-card__title');
        this._elementImage = this._newItem.querySelector('.photo-card__img');
        this._elementLike = this._newItem.querySelector('.photo-card__like');
        this._deleteCard = this._newItem.querySelector('.photo-card__delete');

        this._elementTitle.innerText = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._alt;

        this._setEventListeners();

        return this._newItem;
    }

    //слушатели событий
    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {this._handleLike()});
        this._deleteCard.addEventListener('click', () => {this._handleDelete()});
        this._elementImage.addEventListener('click', () => {this._handleImageClick()});
    }

    //функции событий
    _handleLike() {
        this._elementLike.classList.toggle('photo-card__like_active');
    }

    _handleDelete() {
        this._newItem.remove();
    }

  
}


