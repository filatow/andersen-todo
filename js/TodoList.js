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

    this.render();
  }

  #getTodoListMarkup(todoItemsMarkup = '') {
    const todoListMarkup = `<ul class="list-group">${todoItemsMarkup}</ul>`;

    return todoListMarkup;
  }

  #listItemClickHandler = (evt) => {
    const currentLabel = evt.target.closest('label');
    if (!currentLabel) return;

    const currentLi = evt.target.closest('li');
    if (!currentLi) return;

    const componentToUpdate = this.#todoItemComponents.find(
      (component) => component.getId() === currentLi.dataset.id
    );
    componentToUpdate.isDone = !componentToUpdate.isDone;
    currentLi.insertAdjacentHTML('afterend', componentToUpdate.getMarkup());
    currentLi.remove();
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

    this.#container.addEventListener('click', this.#listItemClickHandler);
  }
}
