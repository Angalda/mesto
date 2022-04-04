// items - массив с данными для карточек
// renderer - отрисовываает каждый отдельный элемент (карточку)
// section - отрисовывает карточки на странице 
// containerSelector - селектор контейнера с карточками 

export  class Section {
    constructor ({items, renderer}, containerSelector){
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
      
    }

    renderItems() {
        this._items.forEach(
            data => {this._renderer(data, this._container)}
        )
    }

    addItem(element) {
        this._container.prepend(element);
    }
}


