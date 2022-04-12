import { Popup } from './Popup.js';

export class PopupDelete extends Popup {
    constructor(selectorPopup, handleDeleteOk) {
       
        super(selectorPopup);
        this._handleDeleteOk = handleDeleteOk;
        this._buttonDelete = selectorPopup.querySelector('.pop-up__submit-form_delete')

    }
    
    

    setEventListeners () {
        super.setEventListeners();
        this._buttonDelete( 'click', () => this._handleDeleteOk() );
        
    }



}