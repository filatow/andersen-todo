import { TodoItem } from './TodoItem';
import { positionToInsert as position, keyCode, DAY_IN_MS } from './consts';
import { sanitize, formatDate } from './utils';

const newItem = {
  TEXT: 'newItemText',
  CREATION_DATE: 'newItemCreationDate',
  EXPIRATION_DATE: 'newItemExpirationDate',
};

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
    this.#setDefaultNewItemValues();
    this.add(items);
    this.render();
  }

  #setDefaultNewItemValues() {
    this.#setState(newItem.TEXT, '');
    this.#setState(newItem.CREATION_DATE, this.#defaultListItemCreationDate);
    this.#setState(
      newItem.EXPIRATION_DATE,
      this.#defaultListItemExpirationDate
    );
  }

  #setState(variable, value) {
    if (typeof variable !== 'string') return;
    this.#state[variable] = value;

    this.#updateBinding(variable);
  }

  #setBinding(stateVariable, bindedElement, format, property = 'value') {
    if (typeof property !== 'string') return;

    function updateElementValue(newValue) {
      if (typeof format === 'function') {
        bindedElement[property] = format(newValue);
      } else {
        bindedElement[property] = newValue;
      }
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
    });
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
        id="new-item-input" placeholder="Enter task text..."
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
                placeholder="Enter text..."
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
            <button
              type="button" class="btn btn-primary"
              id="save-new-item-button-modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>`;

    return newItemModalMarkup;
  }

  #listItemCheckboxClickHandler = (evt) => {
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

  #listItemDeleteButtonClickHandler = (evt) => {
    const button = evt.target.closest('button.delete-item');
    if (!button) return;

    const itemElementToDelete = evt.target.closest('li');
    if (!itemElementToDelete) return;

    const itemToDeleteIndex = this.#todoItems.findIndex(
      (item) => item.id === itemElementToDelete.dataset.id
    );

    itemElementToDelete.remove();
    this.#todoItems.splice(itemToDeleteIndex, 1);
  };

  #addNewItem(todoListElement) {
    this.add(
      this.#state[newItem.TEXT],
      this.#state[newItem.CREATION_DATE],
      this.#state[newItem.EXPIRATION_DATE]
    );
    todoListElement.insertAdjacentHTML(
      position.BEFORE_END,
      this.#todoItems[this.#todoItems.length - 1].getMarkup()
    );
    this.#setDefaultNewItemValues();
  }

  #enterKeydownHandler = (evt) => {
    const todoListElement = this.#container.querySelector('ul');
    const enterIsPressed = evt.code === keyCode.ENTER;

    if (enterIsPressed) {
      if (!this.#state[newItem.TEXT]) return;
      this.#addNewItem(todoListElement);
    }
  };

  #newItemInputHandler = (evt) => {
    const invalidChar = /[^\w\s,!?()'";:#%$&\-\.]/g;
    evt.target.value = sanitize(evt.target.value, invalidChar);
    this.#setState(newItem.TEXT, evt.target.value);
  };

  #creationDateInputModalChangeHandler = (evt) => {
    this.#setState(newItem.CREATION_DATE, evt.target.value);
  };

  #expirationDateInputModalChangeHandler = (evt) => {
    this.#setState(newItem.EXPIRATION_DATE, evt.target.value);
  };

  #saveNewItemButtonModalClickHandler = () => {
    const todoListElement = this.#container.querySelector('ul');
    this.#addNewItem(todoListElement);
  }

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

    this.#container.addEventListener('click', this.#listItemCheckboxClickHandler);
    this.#container.addEventListener('click', this.#listItemDeleteButtonClickHandler);
    this.#container.addEventListener('keydown', this.#enterKeydownHandler);

    const newItemInput = this.#container.querySelector('#new-item-input');
    const newItemInputModal = this.#container.querySelector(
      '#new-item-input-modal'
    );
    [newItemInput, newItemInputModal].forEach((input) => {
      input.addEventListener('input', this.#newItemInputHandler);
      this.#setBinding(newItem.TEXT, input);
    });

    const creationDateInputModal = this.#container.querySelector(
      '#creation-date-input-modal'
    );
    creationDateInputModal.addEventListener(
      'change',
      this.#creationDateInputModalChangeHandler
    );
    this.#setBinding(newItem.CREATION_DATE, creationDateInputModal, formatDate);

    const expirationDateInputModal = this.#container.querySelector(
      '#expiration-date-input-modal'
    );
    expirationDateInputModal.addEventListener(
      'change',
      this.#expirationDateInputModalChangeHandler
    );
    this.#setBinding(
      newItem.EXPIRATION_DATE,
      expirationDateInputModal,
      formatDate
    );

    const saveNewItemButtonModal = this.#container.querySelector(
      '#save-new-item-button-modal'
    );
    saveNewItemButtonModal.addEventListener(
      'click',
      this.#saveNewItemButtonModalClickHandler
    );
  }
}
