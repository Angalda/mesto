import { Popup } from './Popup.js';
//import { Card } from './Card.js';
//import {  createNewCard } from './index.js'


export class PopupWithForm extends Popup {
    constructor(selectorPopup, handleSubmit) {
       
        super(selectorPopup);
        this._handleSubmit = handleSubmit;
        this._form = document.querySelector('.pop-up__form-cards');

        this._popUpInputValueCardTitle = document.querySelector('.pop-up__input_value_card-title');
        this._popUpInputValueCardLink = document.querySelector('.pop-up__input_value_card-link');
        this._cardsList = document.querySelector('.photo-cards__list');
        this._getInputValues = this._getInputValues.bind(this);
    }
    
    
    _getInputValues () {
        const newCard = {};
        newCard.name = this._popUpInputValueCardTitle.value;
        newCard.link = this._popUpInputValueCardLink.value;
        this._handleSubmit(newCard);
        this.close();

    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', 
            this._getInputValues()
            );
        

    }

    close () {
        super.close();
        this._form.reset();

    }

}