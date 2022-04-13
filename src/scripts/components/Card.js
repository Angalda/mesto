export { Card }

class Card {
    constructor(data, template, handleImageClick, handleDeleteOk, addLike, removeLike) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._alt = data.name;
        this._template = template;
        this._handleImageClick = handleImageClick;
        this._popupDelete = document.querySelector('.pop-up_type_delete');
        this.owner = data.owner;
        this._handleDeleteOk = handleDeleteOk;
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
    }

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
        if (this._likes) {this._sumLike.innerText = this._likes.length} else {
            this._sumLike.innerText = 0;}
        if (this.owner) {
            if (this.owner._id == '9d961b3d492db5d3f8aa9cd8') {this._deleteCard.classList.add('photo-card__delete_visible')}
        }
        this._setEventListeners();

        return this._newItem;
    }

    //слушатели событий
    _setEventListeners() {
        this._elementLike.addEventListener('click', () => {this._handleLike()});
        this._deleteCard.addEventListener('click', () => {this._handleDelete()});
        this._elementImage.addEventListener('click', () => {this._handleImageClick()});
    }

    //функции событий
    _handleLike() {
        this._elementLike.classList.toggle('photo-card__like_active');
        if (this._elementLike.classList.contains('photo-card__like_active')) {
            
            this._addLike(this._cardId, this._sumLike);

        } else {this._removeLike(this._cardId, this._sumLike)}
        
    }


    _handleDelete() {
        this._popupDelete.classList.add('pop-up_opened');
        this._popupDelete.querySelector('.pop-up__submit-form_delete').addEventListener( 'click', () => {
           this._handleDeleteOk(this._cardId);
           this._popupDelete.classList.remove('pop-up_opened');
           this._newItem.remove();
           this._newItem = null;
         })
       
    }

   


}



