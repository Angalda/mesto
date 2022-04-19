import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(selectorPopup, handleSubmit) {
       
        super(selectorPopup);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.pop-up__form');
        this._getInputValues = this._getInputValues.bind(this);
        this._button = this._popup.querySelector('.pop-up__submit-form');
        this._text = this._button.innerText;
    }
    
    
    _getInputValues () {
        const inputs = [...this._form.querySelectorAll('.pop-up__input')];
        const values = {}
        inputs.forEach(input => {
            values[input.name] = input.value
        });

        return values;
    }

    changeSubmitHandler(newSubmitHandler){
        this._handleSubmit = newSubmitHandler;
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener( 'submit', (evt) => {
            evt.preventDefault();
            
            this._handleSubmit(this._getInputValues());
               
         });
    }

    buttonTextChange () {
        this._button.innerText=('Сохранение...');
    }
    

    buttonTextToDefolt () {
        this._button.innerText=this._text;
    }

    close () {
        super.close();
        this._form.reset();
    }

}