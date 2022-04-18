export { Card }

class Card {
    constructor(data, userId, template, handleImageClick, handleDelete, addLike, removeLike) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id; //id карточки
        this._userId = userId; //id текущего пользователя
        this.owner = data.owner; //id пользователя создавшего карточку
        this._alt = data.name;
        this._template = template;
        this._handleImageClick = handleImageClick;

        this._handleDelete = handleDelete; //обработчик корзины
        this._addLike = addLike;
        this._removeLike = removeLike;
    }

    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._template)
            .content
            .querySelector('.photo-card')
            .cloneNode(true);

        // вернём DOM-элемент карточки
        return cardElement;
    };

    _setLikes() {
        if (this._likes) {
            this._sumLike.innerText = this._likes.length;

            this._likes.forEach((like) => {if(like._id == this._userId) {
                this._elementLike.classList.add('photo-card__like_active');
            }
        })
        
        } else {
            this._sumLike.innerText = 0;}
    };


    generateCard() {
        this._newItem = this._getTemplate();
        
        this._elementTitle = this._newItem.querySelector('.photo-card__title');
        this._elementImage = this._newItem.querySelector('.photo-card__img');
        this._elementLike = this._newItem.querySelector('.photo-card__like');
        this._deleteCard = this._newItem.querySelector('.photo-card__delete');
        this._sumLike = this._newItem.querySelector('.photo-card__like-count');
        
        this._elementTitle.innerText = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._alt;

        this._setLikes()


        if (this.owner) {
            if (this.owner._id == this._userId) {this._deleteCard.classList.add('photo-card__delete_visible')}
        }
        this._setEventListeners();

        return this._newItem;
    }

    //слушатели событий
    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {this._handleLike()});
        this._deleteCard.addEventListener('click', () => {this._handleDelete(this._cardId)});
        this._elementImage.addEventListener('click', () => {this._handleImageClick()});
    }

    //функции событий
    _handleLike() {
        this._elementLike.classList.toggle('photo-card__like_active');
        if (this._elementLike.classList.contains('photo-card__like_active')) {
            
            this._addLike(this._cardId, this._sumLike);

        } else {this._removeLike(this._cardId, this._sumLike)}
        
    }


    deleteCard() {
        this._newItem.remove();
        this._newItem = null;
    }

}



