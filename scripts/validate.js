/*//добавляем класс с ошибкой
const showInputError = ({ inputErrorClass }, element) => { element.classList.add(inputErrorClass) };

//удаляем класс с ошибкой
const hideInputError = ({ inputErrorClass }, element) => { element.classList.remove(inputErrorClass) };

//активируем кнопку удаляя класс
const activeButton = (inactiveButtonClass, element) => {
    element.classList.remove(inactiveButtonClass);
    element.removeAttribute("disabled");
};

//деактивируем кнопку добавляя класс
const deactiveButton = (inactiveButtonClass, element) => {
    element.classList.add(inactiveButtonClass);
    element.setAttribute("disabled", "disabled")
};

// ищем span для oшибки
const findSpanError = function (element) {
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
const toggleButton = function ({ inactiveButtonClass }, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        deactiveButton(inactiveButtonClass, buttonElement)
    } else {
        activeButton(inactiveButtonClass, buttonElement)
    }
}

//проверяем валидность
const isValid = (rest, input) => {
    if (!input.validity.valid) {
        showInputError(rest, input);
        findSpanError(input).textContent = input.validationMessage;

    } else {
        hideInputError(rest, input);
        findSpanError(input).textContent = '';
    }
}

//включить проверку для массива форм
const enableValidation = ({ formSelector, submitButtonSelector, inputSelector, ...rest }) => {
    //массив форм со страницы
    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });
        const buttonElement = formElement.querySelector(submitButtonSelector);
        const popUpInputArr = Array.from(formElement.querySelectorAll(inputSelector));

        toggleButton(rest, popUpInputArr, buttonElement);
        //слушаем ввод данных в инпут
        popUpInputArr.forEach((item) => {
            item.addEventListener(
                'input', function (evt) {
                    isValid(rest, item);
                    toggleButton(rest, popUpInputArr, buttonElement)
                }
            )
        })
    })
}

enableValidation({
    formSelector: '.pop-up__form',
    submitButtonSelector: '.pop-up__submit-form',
    inputSelector: '.pop-up__input',
    inactiveButtonClass: 'pop-up__submit-form_disabled',
    inputErrorClass: 'pop-up__input_warning',
});

//form.checkValidity() проверяет всю форму вернет тру или фолс
//event.target в каком элементе событие
//event.target.value = поможет узнать значение при вводе в ипут