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
  pullUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
    
  }


  //Загрузка данных для карточек с сервера
  getCardInfo() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
  })

  .then((res) => this._checkResponse(res))
} 



 //Редактирование профиля на сервере!!!
 postUserInfo (name, about) {

  fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
          name: name,
          about: about
        })
  })
  
  .then((res) => this._checkResponse(res))
  .then((result) => console.log(result))
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

//Добавление данных новой карточки на сервер !!!
postCardInfo (name, link) {

  fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
          name: name,
          link: link
        })
  })
  
  .then((res) => this._checkResponse(res))
  .then((result) => console.log(result))
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

//Удаление карточки с сервера!!!
deleteCard (idCard) {
  console.log(idCard)

  fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers
  })
  .then((res) => this._checkResponse(res))
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

//Постановка и снятие лайка на сервере!!!

addLike(idCard, likes) {
  fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers
  })
  .then((res) => this._checkResponse(res))
  
  .then((result) => {        
      likes.innerText = result.likes.length;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}

removeLike(idCard, likes) {
    
  fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers
  })

  .then((res) => this._checkResponse(res))
  
  .then((result) => {
      likes.innerText = result.likes.length;
  }) 

  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
 
}

changeAvatar (data) {

  console.log(data);
  
      fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              avatar: data.link
            })
      })
      .then((res) => this._checkResponse(res))
      .then((result) => console.log(result))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
 
}

}