export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;

    }


    //добавляем класс с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    };

    //удаляем класс с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
            //findSpanError(input).textContent = input.validationMessage;

        } else {
            this._hideInputError(inputElement);
            //findSpanError(input).textContent = '';
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };


    _disabledSubmitButton(buttonElement) {
        buttonElement.classList.add(this._settings.inactiveButtonClass);
        buttonElement.disabled = true;
    }

    _enableSubmitButton(buttonElement) {
        buttonElement.classList.remove(this._settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disabledSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    _setEventListeners() {

        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);


        //слушаем ввод данных в инпут
        inputList.forEach((inputElement) => {
            inputElement.addEventListener(
                'input', () => {
                    this._checkInputValidity(inputElement);
                    this._toggleButtonState(inputList, buttonElement);
                });
        })
    }


    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        this._setEventListeners()
    }

}

