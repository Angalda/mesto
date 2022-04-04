import { Popup } from './Popup.js';
//import { Card } from './Card.js';
//import {  createNewCard } from './index.js'


export class PopupWithForm extends Popup {
    constructor(selectorPopup, handleSubmit) {
       
        super(selectorPopup);
        this._handleSubmit = handleSubmit;
        this._form = this._selectorPopup.querySelector('.pop-up__form');

        //this._popUpInputValueCardTitle = document.querySelector('.pop-up__input_value_card-title');
        //this._popUpInputValueCardLink = document.querySelector('.pop-up__input_value_card-link');
        //this._cardsList = document.querySelector('.photo-cards__list');
        this._getInputValues = this._getInputValues.bind(this);
    }
    
    
    _getInputValues () {
        const inputs = [...this._form.querySelectorAll('.pop-up__input')];
        const values = {}
        inputs.forEach(input => {
            values[input.name] = input.value
        });

        return values;


        /*const newCard = {};
        newCard.name = this._popUpInputValueCardTitle.value;
        newCard.link = this._popUpInputValueCardLink.value;
        this._handleSubmit(newCard);
        this.close();*/

    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener( 'submit', () => this._handleSubmit(this._getInputValues()) );
    }

    close () {
        super.close();
        this._form.reset();
    }

}