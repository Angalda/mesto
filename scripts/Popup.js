import closeByEscape from './index.js';

export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
    }

    open() {
        this._selectorPopup.classList.add('pop-up_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._selectorPopup.classList.remove('pop-up_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.pop-up_opened');
            closePopUp(openedPopup);
        }
    }

    setEventListeners(){}
}