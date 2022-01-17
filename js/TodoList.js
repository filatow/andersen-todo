import { TodoItem } from './TodoItem.js';

export class TodoList {
  #container;
  #todoItems;
  #todoItemComponents;

  constructor(container, items = []) {
    this.#container = container;
    this.#todoItems = items;
    this.#todoItemComponents = this.#todoItems.map(
      (item) => new TodoItem(item)
    );
  }

  #getTodoListMarkup(todoItemsMarkup = '') {
    const todoListMarkup = `<ul class="list-group">${todoItemsMarkup}</ul>`;

    return todoListMarkup;
  }

  render() {
    let todoItemsMarkup = '';
    if (this.#todoItemComponents.length) {
      todoItemsMarkup = this.#todoItemComponents
        .map((component) => component.getMarkup())
        .join('');
    }

    this.#container.insertAdjacentHTML(
      'afterbegin',
      this.#getTodoListMarkup(todoItemsMarkup)
    );
  }
}
