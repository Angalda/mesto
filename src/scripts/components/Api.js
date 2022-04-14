export class Api {
    constructor ({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;

    }
   _checkResponse(res) {
       if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
       }
       return res.json()
   }

//Получаем с сервера информацию о пользователе
    getUserInfo () {
    fetch('https://nomoreparties.co/v1/cohort-39/users/me', {
      headers: {
        authorization: '2ee8c513-1056-4e42-b03f-51f9bdfbc616'
      }
    })
    .then((res) => this._checkResponse(res))
}
}