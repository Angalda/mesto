//import closeByEscape from './index.js';

export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
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
            //const openedPopup = document.querySelector('.pop-up_opened');
            //closePopUp(openedPopup);
            this.close();
        }
    }

    setEventListeners(){
        const closeButton = this._selectorPopup.querySelector('.pop-up__closed');

        closeButton.addEventListener('mousedown', () => {this.close()});

        this._selectorPopup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('pop-up_opened') || evt.target === closeButton) {
                this.close()
            }
        })
    }

} 