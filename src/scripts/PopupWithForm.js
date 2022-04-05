import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selectorPopup, handleSubmit) {
       
        super(selectorPopup);
        this._handleSubmit = handleSubmit;
        this._form = this._selectorPopup.querySelector('.pop-up__form');
        this._getInputValues = this._getInputValues.bind(this);
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
        this._form.addEventListener( 'submit', () => this._handleSubmit(this._getInputValues()) );
    }

    close () {
        super.close();
        this._form.reset();
    }

}