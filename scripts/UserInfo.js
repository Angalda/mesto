import { Popup } from "./Popup.js";

export class UserInfo extends Popup{
    constructor ({profileNameSelector, profileNameSelectorJobSelector}){
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileNameSelectorJobSelector);

    }
    getUserInfo(){}
    setUserInfo(title, job){
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
    }
}