import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    open (text, link) {
        const image = this._selectorPopup.querySelector('.pop-up__photo');
        const caption = this._selectorPopup.querySelector('.pop-up__title-photo-view');
        image.src = link;
        caption.textContent = text;

        super.open();
    }
}
