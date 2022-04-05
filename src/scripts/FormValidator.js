export class FormValidator {
    constructor(settings, form) {
        
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._settings = settings;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._form = form;
        
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    resetValidation() {
        this._toggleButtonState(); 
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        });
      }

    //добавляем класс с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    //удаляем класс с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);

        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };


    disabledSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _toggleButtonState() {
        
        if (this._hasInvalidInput()) {
           this.disabledSubmitButton(this._buttonElement);
        } else {

              this._enableSubmitButton(this._buttonElement);
        }
    }

    _setEventListeners() {
    
        //слушаем ввод данных в инпут
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener(
                'input', () => {
                    this._checkInputValidity(inputElement);
                    this._toggleButtonState(/*this._inputList*/)
                });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        this._setEventListeners()
    }

}

