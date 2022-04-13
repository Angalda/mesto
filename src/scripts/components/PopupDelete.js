import { Popup } from './Popup.js';

export class PopupDelete extends Popup {
    constructor(selectorPopup, handleDeleteOk, id) {
       
        super(selectorPopup);
        this._handleDeleteOk = handleDeleteOk;
        this._buttonDelete = selectorPopup.querySelector('.pop-up__submit-form_delete');
        this._id = id;

    }
    
    

    setEventListeners () {
        super.setEventListeners();
        
        
    }



}