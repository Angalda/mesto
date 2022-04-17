
export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatar }) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            description: this._jobElement.textContent,
            //avatar: this._avatarElement.src
        }
    }


    setUserInfo(title, job) {
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
        //this._avatarElement.src = avatar;
    }

     /* Меняем аватар */

     setUserAvatar(avatar) {
        this._profileAvatar.src = avatar;
    }
}