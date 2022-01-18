import { TodoItem } from './TodoItem.js';
import { POSITION_TO_INSERT as POSITION, KEY_CODE } from './consts';

export class TodoList {
  #container;
  #todoItems = [];

  constructor(container, items = []) {
    this.#container = container;
    this.add(...items);
    this.render();
  }

  #getTodoListMarkup(todoItemsMarkup = '') {
    const todoListMarkup = `<ul class="list-group">${todoItemsMarkup}</ul>`;

    return todoListMarkup;
  }

  #getNewItemInputGroupMarkup() {
    const newItemInputGroupMarkup = `
    <div class="input-group mb-3">
      <input
        type="text" class="form-control"
        id="new-item-input" placeholder="New task"
      >
      <button class="btn btn-warning fs-5" type="button">+</button>
    </div>`;
    
    return newItemInputGroupMarkup;
  }

  #listItemClickHandler = (evt) => {
    const clickedLabel = evt.target.closest('label');
    if (!clickedLabel) return;

    const clickedItemElement = evt.target.closest('li');
    if (!clickedItemElement) return;

    const itemToUpdate = this.#todoItems.find(
      (item) => item.getId() === clickedItemElement.dataset.id
    );

    itemToUpdate.isDone = !itemToUpdate.isDone;
    clickedItemElement.insertAdjacentHTML(
      POSITION.AFTER_END,
      itemToUpdate.getMarkup()
    );
    clickedItemElement.remove();
  };

  #enterKeydownHandler = (evt) => {
    const newItemInput = this.#container.querySelector('#new-item-input');
    const todoListElement = this.#container.querySelector('ul');
    const enterIsPressed = evt.code === KEY_CODE.ENTER;

    if (enterIsPressed) {
      this.add(newItemInput.value);
      todoListElement.insertAdjacentHTML(
        POSITION.BEFORE_END,
        this.#todoItems[this.#todoItems.length - 1].getMarkup()
      );
      newItemInput.value = '';
    }
  };

  add(...items) {
    this.#todoItems = [
      ...this.#todoItems,
      ...items.map((item) => new TodoItem(item)),
    ];
  }

  render() {
    let todoItemsMarkup = '';
    if (this.#todoItems.length) {
      todoItemsMarkup = this.#todoItems
        .map((item) => item.getMarkup())
        .join('');
    }

    this.#container.insertAdjacentHTML(
      POSITION.BEFORE_END,
      this.#getNewItemInputGroupMarkup()
    );
    this.#container.insertAdjacentHTML(
      POSITION.BEFORE_END,
      this.#getTodoListMarkup(todoItemsMarkup)
    );

    this.#container.addEventListener('click', this.#listItemClickHandler);
    this.#container.addEventListener('keydown', this.#enterKeydownHandler);
  }
}
