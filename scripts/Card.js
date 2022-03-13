import {openPopUp, popUpTitlePhotoView, popUpPhoto} from './index.js';

export class Card {
    constructor (data, template) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    }

    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
          const cardElement = document
          .querySelector(this._template)
          .content
          //.querySelector('.photo-card')
          .cloneNode(true);
          
        // вернём DOM-элемент карточки
          return cardElement;
    } 

    _createCard() {
        this._newItem = this._getTemplate();
        this._setEventListeners();
        this._newItem.querySelector('.photo-card__title').innerText = this._name;
        this._photo = this._newItem.querySelector('.photo-card__img');
        this._photo.src = this._link;
        this._photo.alt =  this._name;
       
        return this._newItem;
    }
    //функции событий
    _handleLike(event) {
        event.target.classList.toggle('photo-card__like_active');
    }

    _handleDelete(event) {
        event.target.closest('.photo-card').remove();
    }

    _handleView(event) {
        popUpPhoto.src = event.target.src;
        popUpPhoto.alt = event.target.alt;
        popUpTitlePhotoView.textContent = event.target.alt;
        openPopUp(popUpPhotoView);
    }

    //слушатели событий
    _setEventListeners() {
        this._newItem.querySelector('.photo-card__like').addEventListener('click', this._handleLike);
        this._newItem.querySelector('.photo-card__delete').addEventListener('click', this._handleDelete);
        this._newItem.querySelector('.photo-card__img').addEventListener('click', this._handleView);
    }

}


