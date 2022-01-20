import { TodoItem } from './TodoItem';
import { positionToInsert as position, keyCode, DAY_IN_MS } from './consts';
import { sanitize, formatDate } from './utils';
import { Abstract } from './Abstract';

const newItem = {
  TEXT: 'newItemText',
  CREATION_DATE: 'newItemCreationDate',
  EXPIRATION_DATE: 'newItemExpirationDate',
};

const getNewItemInputGroupMarkup = () => {
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
};

const getTodoListMarkup = (todoItemsMarkup = '') => {
  const todoListMarkup = `<ul class="list-group">${todoItemsMarkup}</ul>`;

  return todoListMarkup;
};

const getNewItemCreateModalMarkup = (itemCreationDate, itemExpirationDate) => {
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
                value="${formatDate(itemCreationDate)}"
              />
            </div>
            <div class="col">
              <label for="expiration-date-input-modal" class="form-label">Expiration date</label>
              <input
                type="date"
                class="form-control"
                id="expiration-date-input-modal"
                value="${formatDate(itemExpirationDate)}"
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
            Cancel
          </button>
          <button
            type="button" class="btn btn-primary"
            id="save-new-item-button-modal"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>`;

  return newItemModalMarkup;
};

const getEditItemModalMarkup = (itemCreationDate, itemExpirationDate) => {
  const editItemModalMarkup = `
  <div class="modal fade" id="edit-item-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit task</h5>
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
              id="edit-item-input-modal"
              placeholder="Enter text..."
            />
          </div>
          <div class="row">
            <div class="col">
              <label for="edit-creation-date-input-modal" class="form-label">Creation date</label>
              <input
                type="date"
                class="form-control"
                id="edit-creation-date-input-modal"
                value="${formatDate(itemCreationDate)}"
              />
            </div>
            <div class="col">
              <label for="edit-expiration-date-input-modal" class="form-label">Expiration date</label>
              <input
                type="date"
                class="form-control"
                id="edit-expiration-date-input-modal"
                value="${formatDate(itemExpirationDate)}"
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
            Cancel
          </button>
          <button
            type="button" class="btn btn-primary"
            id="save-edited-item-button-modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>`;

  return editItemModalMarkup;
};

export class TodoList extends Abstract {
  #container;
  #todoItems = [];
  #defaultListItemCreationDate;
  #defaultListItemExpirationDate;

  constructor(container, items = []) {
    super();
    this.#container = container;
    this.#defaultListItemCreationDate = new Date();
    this.#defaultListItemExpirationDate = new Date(
      Date.parse(this.#defaultListItemCreationDate) + DAY_IN_MS
    );
    this.#setDefaultNewItemValues();
    this.#addItemToList(items);
  }

  #setDefaultNewItemValues() {
    this.setState(newItem.TEXT, '');
    this.setState(newItem.CREATION_DATE, this.#defaultListItemCreationDate);
    this.setState(newItem.EXPIRATION_DATE, this.#defaultListItemExpirationDate);
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

  #listItemEditButtonClickHandler = (evt) => {
    const button = evt.target.closest('button.edit-item');
    if (!button) return;

    const itemElementToEdit = evt.target.closest('li');
    if (!itemElementToEdit) return;

    const itemToEditIndex = this.#todoItems.findIndex(
      (item) => item.id === itemElementToEdit.dataset.id
    );

    this.setState('itemToEdit', this.#todoItems[itemToEditIndex]);
    const itemToEdit = this.getState('itemToEdit');
    const editItemInputModal = this.#container.querySelector(
      '#edit-item-input-modal'
    );
    const editCreationDateInputModal = this.#container.querySelector(
      '#edit-creation-date-input-modal'
    );
    const editExpirationDateInputModal = this.#container.querySelector(
      '#edit-expiration-date-input-modal'
    );

    editItemInputModal.value = itemToEdit.text;
    editCreationDateInputModal.value = formatDate(itemToEdit.creationDate);
    editExpirationDateInputModal.value = formatDate(itemToEdit.expirationDate);
  };

  #enterKeydownHandler = (evt) => {
    const enterIsPressed = evt.code === keyCode.ENTER;

    if (enterIsPressed) {
      if (!this.getState(newItem.TEXT)) return;
      this.addItem();
    }
  };

  #newItemInputHandler = (evt) => {
    const invalidChar = /[^\w\s,!?()'";:#%$&\-\.]/g;
    evt.target.value = sanitize(evt.target.value, invalidChar);
    this.setState(newItem.TEXT, evt.target.value);
  };

  #creationDateInputModalChangeHandler = (evt) => {
    this.setState(newItem.CREATION_DATE, evt.target.value);
  };

  #expirationDateInputModalChangeHandler = (evt) => {
    this.setState(newItem.EXPIRATION_DATE, evt.target.value);
  };

  #saveNewItemButtonModalClickHandler = () => {
    this.addItem();
  };

  #saveEditedItemButtonModalClickHandler = () => {
    const itemToUpdate = this.getState('itemToEdit');
    const editItemInputModal = this.#container.querySelector(
      '#edit-item-input-modal'
    );
    const editCreationDateInputModal = this.#container.querySelector(
      '#edit-creation-date-input-modal'
    );
    const editExpirationDateInputModal = this.#container.querySelector(
      '#edit-expiration-date-input-modal'
    );

    itemToUpdate.text = editItemInputModal.value;
    itemToUpdate.creationDate = editCreationDateInputModal.value;
    itemToUpdate.expirationDate = editExpirationDateInputModal.value;

    const elementToReplace = this.#container.querySelector(
      `li.list-group-item[data-id=${itemToUpdate.id}]`
    );
    elementToReplace.insertAdjacentHTML(
      position.AFTER_END,
      itemToUpdate.getMarkup()
    );
    elementToReplace.remove();
  }

  #addItemToList(
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

  addItem(
    text = this.getState(newItem.TEXT),
    creationDate = this.getState(newItem.CREATION_DATE),
    expirationDate = this.getState(newItem.EXPIRATION_DATE)
  ) {
    const todoListElement = this.#container.querySelector('ul');
    const insertItemMarkup = () => {
      todoListElement.insertAdjacentHTML(
        position.BEFORE_END,
        this.#todoItems[this.#todoItems.length - 1].getMarkup()
      );
    };

    if (!text || typeof text !== 'string') return;

    this.#addItemToList(text, creationDate, expirationDate);
    insertItemMarkup();
    this.#setDefaultNewItemValues();
  }

  render() {
    const todoItemsMarkup = this.#todoItems
      .map((item) => item.getMarkup())
      .join('');

    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getNewItemInputGroupMarkup()
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getTodoListMarkup(todoItemsMarkup)
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getNewItemCreateModalMarkup(
        this.#defaultListItemCreationDate,
        this.#defaultListItemExpirationDate
      )
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getEditItemModalMarkup(
        this.#defaultListItemCreationDate,
        this.#defaultListItemExpirationDate
      )
    );

    this.#container.addEventListener(
      'click',
      this.#listItemCheckboxClickHandler
    );
    this.#container.addEventListener(
      'click',
      this.#listItemDeleteButtonClickHandler
    );
    this.#container.addEventListener(
      'click',
      this.#listItemEditButtonClickHandler
    );
    this.#container.addEventListener('keydown', this.#enterKeydownHandler);

    const newItemInput = this.#container.querySelector('#new-item-input');
    const newItemInputModal = this.#container.querySelector(
      '#new-item-input-modal'
    );
    [newItemInput, newItemInputModal].forEach((input) => {
      input.addEventListener('input', this.#newItemInputHandler);
      this.setBinding(newItem.TEXT, input);
    });

    const creationDateInputModal = this.#container.querySelector(
      '#creation-date-input-modal'
    );
    creationDateInputModal.addEventListener(
      'change',
      this.#creationDateInputModalChangeHandler
    );
    this.setBinding(newItem.CREATION_DATE, creationDateInputModal, formatDate);

    const expirationDateInputModal = this.#container.querySelector(
      '#expiration-date-input-modal'
    );
    expirationDateInputModal.addEventListener(
      'change',
      this.#expirationDateInputModalChangeHandler
    );
    this.setBinding(
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

    const saveEditedItemButtonModal = this.#container.querySelector(
      '#save-edited-item-button-modal'
    );
    saveEditedItemButtonModal.addEventListener(
      'click',
      this.#saveEditedItemButtonModalClickHandler
    );
  }
}
