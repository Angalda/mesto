// items - массив с данными для карточек
// renderer - отрисовываает каждый отдельный элемент (карточку)
// section - отрисовывает карточки на странице 
// CardListSelector - селектор контейнера с карточками 

export  class Section {
    constructor ({items, renderer}, CardListSelector){
      this._items = items;
      this._renderer = renderer;
      this._CardListSelector = document.querySelector(CardListSelector);
      
    }

       addItem() {
        this._items.forEach(element => {
            const item = this._renderer(element);
            this._CardListSelector.prepend(item);
        });   
       
    }
}


