export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  render() {
    this._renderItems();
  }

  addItem(element) {
    this._container.prepend(element);
  }

  setItems(items) {
    this._items = items.reverse();
  }
}
