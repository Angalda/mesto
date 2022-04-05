

export class UserInfo {
    constructor ({profileNameSelector, profileJobSelector}){
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._nameInput = document.querySelector('.pop-up__input_value_name');
        this._descriptionInput = document.querySelector('.pop-up__input_value_description');

    }
    getUserInfo() {
        this._nameInput.value = this._nameElement.textContent;
        this._descriptionInput = this._jobElement.textContent;

    }

    setUserInfo(title, job) {
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
    }
}