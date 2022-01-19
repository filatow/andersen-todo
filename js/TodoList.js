import { TodoItem } from './TodoItem';
import { positionToInsert as position, keyCode, DAY_IN_MS } from './consts';
import { sanitize, formatDate } from './utils';

const newItem = {
  TEXT: 'newItemText',
  CREATION_DATE: 'newItemCreationDate',
  EXPIRATION_DATE: 'newItemExpirationDate'
}

export class TodoList {
  #container;
  #todoItems = [];
  #defaultListItemCreationDate;
  #defaultListItemExpirationDate;
  #state = {};
  #binding = {};

  constructor(container, items = []) {
    this.#container = container;
    this.#defaultListItemCreationDate = new Date();
    this.#defaultListItemExpirationDate = new Date(
      Date.parse(this.#defaultListItemCreationDate) + DAY_IN_MS
    );
    this.#setState(newItem.TEXT, '');
    this.#setState(newItem.CREATION_DATE, this.#defaultListItemCreationDate);
    this.#setState(newItem.EXPIRATION_DATE, this.#defaultListItemExpirationDate);
    this.add(items);
    this.render();
  }

  #setState(variable, value) {
    if (typeof variable !== 'string') return;
    this.#state[variable] = value;

    this.#updateBinding(variable);
  }

  #setBinding(stateVariable, bindedElement, property = 'value') {
    function updateElementValue(newValue) {
      bindedElement[property] = newValue;
    }

    if (this.#binding[stateVariable]) {
      this.#binding[stateVariable].push(updateElementValue);
    } else {
      this.#binding[stateVariable] = [updateElementValue];
    }
  }

  #updateBinding(variable) {
    if (!this.#binding[variable]) return;

    this.#binding[variable].forEach((updateFunc) => {
      updateFunc(this.#state[variable]);
    })
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
      <button
        class="btn btn-warning fs-5"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#new-item-modal"
      >+</button>
    </div>`;

    return newItemInputGroupMarkup;
  }

  #getNewItemModalMarkup() {
    const newItemModalMarkup = `
    <div class="modal fade" id="new-item-modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New task</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="new-item-input-modal"
                placeholder="New task"
              />
            </div>
            <div class="row">
              <div class="col">
                <label for="creation-date-input-modal" class="form-label">Creation date</label>
                <input
                  type="date"
                  class="form-control"
                  id="creation-date-input-modal"
                  value="${formatDate(this.#defaultListItemCreationDate)}"
                />
              </div>
              <div class="col">
                <label for="expiration-date-input-modal" class="form-label">Expiration date</label>
                <input
                  type="date"
                  class="form-control"
                  id="expiration-date-input-modal"
                  value="${formatDate(this.#defaultListItemExpirationDate)}"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>`;

    return newItemModalMarkup;
  }

  #listItemClickHandler = (evt) => {
    const clickedLabel = evt.target.closest('label');
    if (!clickedLabel) return;

    const clickedItemElement = evt.target.closest('li');
    if (!clickedItemElement) return;

    const itemToUpdate = this.#todoItems.find(
      (item) => item.id === clickedItemElement.dataset.id
    );

    itemToUpdate.isDone = !itemToUpdate.isDone;
    clickedItemElement.insertAdjacentHTML(
      position.AFTER_END,
      itemToUpdate.getMarkup()
    );
    clickedItemElement.remove();
  };

  #enterKeydownHandler = (evt) => {
    const newItemInput = this.#container.querySelector('#new-item-input');
    const todoListElement = this.#container.querySelector('ul');
    const enterIsPressed = evt.code === keyCode.ENTER;

    if (enterIsPressed) {
      if (!newItemInput.value.length) return;

      this.add(newItemInput.value);
      todoListElement.insertAdjacentHTML(
        position.BEFORE_END,
        this.#todoItems[this.#todoItems.length - 1].getMarkup()
      );
      newItemInput.value = '';
    }
  };

  #newItemInputHandler = (evt) => {
    const invalidChar = /[^\w\s,!?()'";:#%$&\-\.]/g;
    evt.target.value = sanitize(evt.target.value, invalidChar);
    this.#setState(newItem.TEXT, evt.target.value);
  };

  add(
    data,
    creationDate = this.#defaultListItemCreationDate,
    expirationDate = this.#defaultListItemExpirationDate
  ) {
    if (Array.isArray(data)) {
      this.#todoItems = [
        ...this.#todoItems,
        ...data.map((item) => new TodoItem(item, creationDate, expirationDate)),
      ];
    } else {
      this.#todoItems.push(new TodoItem(data, creationDate, expirationDate));
    }
  }

  render() {
    let todoItemsMarkup = '';
    if (this.#todoItems.length) {
      todoItemsMarkup = this.#todoItems
        .map((item) => item.getMarkup())
        .join('');
    }

    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      this.#getNewItemInputGroupMarkup()
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      this.#getTodoListMarkup(todoItemsMarkup)
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      this.#getNewItemModalMarkup()
    );

    this.#container.addEventListener('click', this.#listItemClickHandler);
    this.#container.addEventListener('keydown', this.#enterKeydownHandler);

    const newItemInput = this.#container.querySelector('#new-item-input');
    const newItemInputModal = this.#container.querySelector(
      '#new-item-input-modal'
    );
    [newItemInput, newItemInputModal].forEach((input) => {
      input.addEventListener('input', this.#newItemInputHandler);
      this.#setBinding(newItem.TEXT, input);
    });
  }
}
