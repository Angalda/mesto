import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selectorPopup, handleSubmit) {
       
        super(selectorPopup);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.pop-up__form');
        this._getInputValues = this._getInputValues.bind(this);
        this._button = this._popup.querySelector('.pop-up__submit-form');
    }
    
    
    _getInputValues () {
        const inputs = [...this._form.querySelectorAll('.pop-up__input')];
        const values = {}
        inputs.forEach(input => {
            values[input.name] = input.value
        });

        return values;

    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener( 'submit', (evt) => {
            evt.preventDefault();
           this._button.innerText=('Сохранение...');
            this._handleSubmit(this._getInputValues()) });
    }

    close () {
        super.close();
        this._form.reset();
    }

}