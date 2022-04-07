
export class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('pop-up_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('pop-up_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        const closeButton = this._popup.querySelector('.pop-up__closed');

        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('pop-up_opened') || evt.target === closeButton) {
                this.close()
            }
        })
    }

} 