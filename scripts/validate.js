
const formsArr = Array.from(document.querySelectorAll('.pop-up__form'));

//Слушаем события в инпутах
const setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector('.pop-up__submit-form');
    const popUpInputArr = Array.from(formElement.querySelectorAll('.pop-up__input'));
    toggleButton(popUpInputArr, buttonElement);
    //слушаем ввод данных в инпут
    popUpInputArr.forEach((item) => {
        item.addEventListener(
            'input', function (evt) { isValid(item) ;
            toggleButton(popUpInputArr, buttonElement)}
        )
    })
}

//включить проверку для массива форм
const enableValidation = (forms) => {
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        setEventListeners(formElement);

    })
}

//добавляем класс с ошибкой
const showInputError = (element) => {element.classList.add('pop-up__input_warning')};

//удаляем класс с ошибкой
const hideInputError = (element) => {element.classList.remove('pop-up__input_warning')};

// кнопка 
//активируем удаляя класс
const buttonActive = (element) => {element.classList.remove('pop-up__submit-form_disabled');
element.removeAttribute("disabled");};

//деактивируем добавляя класс

const buttonNotActive = (element) => {element.classList.add('pop-up__submit-form_disabled');
element.setAttribute("disabled", "disabled")};



// ищем span
const ErrorId = function (element) {
    const id = element.id;
    return document.querySelector(`.${id}-error`);
}

//проверяем все поля формы на валидность, если поле не валидно вернет true
const hasInvalidInput = (inputArr) => {
    return inputArr.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//Переключаем класс кнопки после проверки полей
const toggleButton = function (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {buttonNotActive(buttonElement)
    } else {
        buttonActive(buttonElement)}
}

//проверяем валидность
const isValid = (input) => {
    if (!input.validity.valid) {
        showInputError(input);
        ErrorId(input).textContent = input.validationMessage;
        console.log(ErrorId(input).textContent);
    } else {
        hideInputError(input);
        ErrorId(input).textContent = '';
    }
}

enableValidation(formsArr);