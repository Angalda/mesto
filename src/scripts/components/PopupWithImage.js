import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._image = this._popup.querySelector('.pop-up__photo');
        this._caption = this._popup.querySelector('.pop-up__title-photo-view');

    }
    open (text, link) {
        
        this._image.src = link;
        this._caption.textContent = text;
        this._image.alt = text;

        super.open();
    }
}
