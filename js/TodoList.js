import { TodoItem } from './TodoItem';
import {
  positionToInsert as position,
  keyCode,
  DAY_IN_MS,
  newItem,
  editItem,
  filterByStatus,
  sortingType,
} from './consts';
import { sanitize, formatDate } from './utils';
import { Abstract } from './Abstract';

const getNewItemInputGroupMarkup = () => {
  const newItemInputGroupMarkup = `
  <div class="input-group mb-3">
    <button
      class="btn btn-outline-light fs-5 toggle-sort-and-filter-panel-button"
      type="button"
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
      <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
    </svg>
    </button>
    <input
      type="text" class="form-control"
      id="new-item-input" placeholder="Enter task text..."
    >
    <button
      class="btn btn-warning fs-4"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#new-item-modal"
    >+</button>
  </div>`;

  return newItemInputGroupMarkup;
};

const getSortAndFilterPanelMarkup = () => {
  const sortAndFilterPanelMarkup = `
  <div class="d-none" id="sort-and-filter-panel">
    <div class="row row-cols-lg-auto g-3 align-items-center text-white mb-3">
      <div class="col">
        Sort by
      </div>
      <div class="col">
        <select class="form-select" id="sorting-type-select">
          <option value="unsorted" selected>Choose...</option>
          <option value="by-text">Text</option>
          <option value="by-creation-date">Creation date</option>
          <option value="by-expiration-date">Expiration date</option>
        </select>
      </div>
      <div class="col">
        <div class="form-check">
          <label class="form-check-label" for="reverse-sorting-order">
            <input
            class="form-check-input"
            type="checkbox"
            id="reverse-sorting-order"
          />
            reverse order
          </label>
        </div>
      </div>
    </div>
  </div>`;

  return sortAndFilterPanelMarkup;
};

const getTodoListMarkup = (todoItemsMarkup = '') => {
  const todoListMarkup = `<ul class="list-group mb-3">${todoItemsMarkup}</ul>`;

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
                value="${itemCreationDate}"
              />
            </div>
            <div class="col">
              <label for="expiration-date-input-modal" class="form-label">Expiration date</label>
              <input
                type="date"
                class="form-control"
                id="expiration-date-input-modal"
                min="${itemCreationDate}"
                value="${itemExpirationDate}"
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
            id="create-new-item-button-modal"
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
                value="${itemCreationDate}"
              />
            </div>
            <div class="col">
              <label for="edit-expiration-date-input-modal" class="form-label">Expiration date</label>
              <input
                type="date"
                class="form-control"
                id="edit-expiration-date-input-modal"
                value="${itemExpirationDate}"
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
            data-bs-dismiss="modal"
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

const getFilterBarMarkup = () => {
  const filterBarMarkup = `
    <div
      id="filter-bar"
      class="d-flex justify-content-between align-items-center"
    >
      <div class="d-inline-block">
        <span class="badge bg-light text-dark">
          <span class="active-items-count fs-6">10</span> items left
        </span>
      </div>
      <div class="d-inline-block">
        <button
          type="button"
          class="btn btn-light status-filter-button 
          status-filter-all-button"
        >
          All
        </button>
        <button
          type="button"
          class="btn btn-outline-light status-filter-button status-filter-active-button"
        >
          Active
        </button>
        <button
          type="button"
          class="btn btn-outline-light status-filter-button status-filter-completed-button"
        >
          Completed
        </button>
        <button type="button" class="btn btn-outline-warning clear-completed-button">
          Clear completed
        </button>
      </div>
    </div>
  `;

  return filterBarMarkup;
};

export class TodoList extends Abstract {
  #container;
  #todoItems = [];
  #defaultListItemCreationDate;
  #defaultListItemExpirationDate;
  #viewSetting = {
    status: filterByStatus.ALL,
    sorting: sortingType.UNSORTED,
  };

  constructor(container, items = []) {
    super();
    this.#container = container;
    this.#defaultListItemCreationDate = formatDate(new Date());
    this.#defaultListItemExpirationDate = formatDate(
      new Date(Date.parse(this.#defaultListItemCreationDate) + DAY_IN_MS)
    );
    this.#setDefaultNewItemValues();
    this.setState('activeTodoItemsCount', 0);
    this.#addToList(items);
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
    if (itemToUpdate.isDone) {
      this.#activeTodoItemsCountDecrement();
    } else {
      this.#activeTodoItemsCountIncrement();
    }

    this.#updateListOfItems();
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
    const [deletedItem] = this.#todoItems.splice(itemToDeleteIndex, 1);
    if (!deletedItem.isDone) {
      this.#activeTodoItemsCountDecrement();
    }
  };

  #listItemEditButtonClickHandler = (evt) => {
    const button = evt.target.closest('button.edit-item');
    if (!button) return;

    const itemToEditElement = evt.target.closest('li');
    if (!itemToEditElement) return;

    const itemToEditIndex = this.#todoItems.findIndex(
      (item) => item.id === itemToEditElement.dataset.id
    );

    const itemToEdit = this.#todoItems[itemToEditIndex];
    this.setState(editItem.ID, itemToEdit.id);
    this.setState(editItem.TEXT, itemToEdit.text);
    this.setState(editItem.CREATION_DATE, itemToEdit.creationDate);
    this.setState(editItem.EXPIRATION_DATE, itemToEdit.expirationDate);
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
    editCreationDateInputModal.value = itemToEdit.creationDate;
    editExpirationDateInputModal.min = itemToEdit.creationDate;
    editExpirationDateInputModal.value = itemToEdit.expirationDate;
  };

  #editCreationDateInputModalChangeHandler = (evt) => {
    this.setState(editItem.CREATION_DATE, evt.target.value);

    const currentCreationDate = this.getState(editItem.CREATION_DATE);
    const currentExpirationDate = this.getState(editItem.EXPIRATION_DATE);
    const editExpirationDateInputModal = this.#container.querySelector(
      '#edit-expiration-date-input-modal'
    );
    editExpirationDateInputModal.min = currentCreationDate;

    if (currentCreationDate >= currentExpirationDate) {
      editExpirationDateInputModal.value = currentCreationDate;
    }
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

    const currentCreationDate = this.getState(newItem.CREATION_DATE);
    const currentExpirationDate = this.getState(newItem.EXPIRATION_DATE);
    const expirationDateInputModal = this.#container.querySelector(
      '#expiration-date-input-modal'
    );
    expirationDateInputModal.min = currentCreationDate;

    if (currentCreationDate >= currentExpirationDate) {
      this.setState(newItem.EXPIRATION_DATE, formatDate(evt.target.value));
    }
  };

  #expirationDateInputModalChangeHandler = (evt) => {
    this.setState(newItem.EXPIRATION_DATE, evt.target.value);
  };

  #saveNewItemButtonModalClickHandler = () => {
    this.addItem();
  };

  #saveEditedItemButtonModalClickHandler = () => {
    const itemToUpdate = this.#todoItems.find(
      (item) => item.id === this.getState(editItem.ID)
    );
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
      `[data-id=${itemToUpdate.id}]`
    );
    elementToReplace.insertAdjacentHTML(
      position.AFTER_END,
      itemToUpdate.getMarkup()
    );
    elementToReplace.remove();
  };

  #activeTodoItemsCountIncrement() {
    this.setState(
      'activeTodoItemsCount',
      this.getState('activeTodoItemsCount') + 1
    );
  }

  #activeTodoItemsCountDecrement() {
    this.setState(
      'activeTodoItemsCount',
      this.getState('activeTodoItemsCount') - 1
    );
  }

  #addToList(data) {
    if (Array.isArray(data)) {
      this.#todoItems = [
        ...this.#todoItems,
        ...data.map((item) => {
          this.#activeTodoItemsCountIncrement();
          return new TodoItem(
            item.text,
            item.creationDate,
            item.expirationDate
          );
        }),
      ];
    } else {
      this.#activeTodoItemsCountIncrement();
      this.#todoItems.push(
        new TodoItem(data.text, data.creationDate, data.expirationDate)
      );
    }
  }

  #getTodoItemsMarkup = (items) => {
    const todoItemsMarkup = items.map((item) => item.getMarkup()).join('');

    return todoItemsMarkup;
  };

  #updateListOfItems = (isReversed = false) => {
    const { status, sorting } = this.#viewSetting;
    let itemsToShow;
    switch (status) {
      case filterByStatus.ALL:
        itemsToShow = [...this.#todoItems];
        break;
      case filterByStatus.ACTIVE:
        itemsToShow = this.#todoItems.filter((item) => !item.isDone);
        break;
      case filterByStatus.COMPLETED:
        itemsToShow = this.#todoItems.filter((item) => item.isDone);
        break;
    }

    switch (sorting) {
      case sortingType.UNSORTED:
        break;
      case sortingType.BY_TEXT:
        itemsToShow.sort((a, b) => (a.text > b.text ? 1 : -1));
        break;
      case sortingType.BY_CREATION_DATE:
        itemsToShow.sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1));
        break;
      case sortingType.BY_EXPIRATION_DATE:
        itemsToShow.sort((a, b) =>
          a.expirationDate > b.expirationDate ? 1 : -1
        );
        break;
    }

    if (isReversed) itemsToShow.reverse();

    const listElement = this.#container.querySelector('ul');
    listElement.innerHTML = this.#getTodoItemsMarkup(itemsToShow);
  };

  #statusFilterButtonClickHandler = (itemStatus) => {
    return (evt) => {
      this.#container
        .querySelectorAll('.status-filter-button')
        .forEach((filterButton) => {
          if (filterButton === evt.target) {
            filterButton.classList.add('btn-light');
            filterButton.classList.remove('btn-outline-light');
          } else {
            filterButton.classList.add('btn-outline-light');
            filterButton.classList.remove('btn-light');
          }
        });
      this.#viewSetting.status = itemStatus;
      this.#updateListOfItems();
    };
  };

  #toggleSortAndFilterPanelButtonClickHandler = () => {
    const sortAndFilterPanelElement = this.#container.querySelector(
      '#sort-and-filter-panel'
    );
    sortAndFilterPanelElement.classList.toggle('d-none');
  };

  #sortingTypeSelectClickHandler = (evt) => {
    this.#viewSetting.sorting = evt.target.value;
    const reverseSortingOrder = this.#container.querySelector(
      '#reverse-sorting-order'
    );
    this.#updateListOfItems(reverseSortingOrder.checked);
  };

  #reverseSortingOrderClickHandler = (evt) => {
    this.#updateListOfItems(evt.target.checked);
  };

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

    this.#addToList({ text, creationDate, expirationDate });
    insertItemMarkup();
    this.#setDefaultNewItemValues();
  }

  render() {
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getNewItemInputGroupMarkup()
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getSortAndFilterPanelMarkup()
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getTodoListMarkup(this.#getTodoItemsMarkup(this.#todoItems))
    );
    this.#container.insertAdjacentHTML(
      position.BEFORE_END,
      getFilterBarMarkup()
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

    const editCreationDateInputModal = this.#container.querySelector(
      '#edit-creation-date-input-modal'
    );
    editCreationDateInputModal.addEventListener(
      'change',
      this.#editCreationDateInputModalChangeHandler
    );

    const activeItemsCountElement = this.#container.querySelector(
      '.active-items-count'
    );
    activeItemsCountElement.textContent = this.getState('activeTodoItemsCount');
    this.setBinding(
      'activeTodoItemsCount',
      activeItemsCountElement,
      null,
      'textContent'
    );

    const creationDateInputModal = this.#container.querySelector(
      '#creation-date-input-modal'
    );
    creationDateInputModal.addEventListener(
      'change',
      this.#creationDateInputModalChangeHandler
    );
    this.setBinding(newItem.CREATION_DATE, creationDateInputModal);

    const expirationDateInputModal = this.#container.querySelector(
      '#expiration-date-input-modal'
    );
    expirationDateInputModal.addEventListener(
      'change',
      this.#expirationDateInputModalChangeHandler
    );
    this.setBinding(newItem.EXPIRATION_DATE, expirationDateInputModal);

    const saveNewItemButtonModal = this.#container.querySelector(
      '#create-new-item-button-modal'
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

    const statusFilterAllButton = this.#container.querySelector(
      '.status-filter-all-button'
    );
    statusFilterAllButton.addEventListener(
      'click',
      this.#statusFilterButtonClickHandler(filterByStatus.ALL)
    );

    const statusFilterActiveButton = this.#container.querySelector(
      '.status-filter-active-button'
    );
    statusFilterActiveButton.addEventListener(
      'click',
      this.#statusFilterButtonClickHandler(filterByStatus.ACTIVE)
    );

    const statusFilterCompletedButton = this.#container.querySelector(
      '.status-filter-completed-button'
    );
    statusFilterCompletedButton.addEventListener(
      'click',
      this.#statusFilterButtonClickHandler(filterByStatus.COMPLETED)
    );

    const clearCompletedButton = this.#container.querySelector(
      '.clear-completed-button'
    );
    clearCompletedButton.addEventListener('click', () => {
      this.#todoItems = this.#todoItems.filter((item) => !item.isDone);

      this.#container.querySelector('.status-filter-all-button').click();
    });

    const toggleSortAndFilterPanelButton = this.#container.querySelector(
      '.toggle-sort-and-filter-panel-button'
    );
    toggleSortAndFilterPanelButton.addEventListener(
      'click',
      this.#toggleSortAndFilterPanelButtonClickHandler
    );

    const sortingTypeSelect = this.#container.querySelector(
      '#sorting-type-select'
    );
    sortingTypeSelect.addEventListener(
      'change',
      this.#sortingTypeSelectClickHandler
    );

    const reverseSortingOrder = this.#container.querySelector(
      '#reverse-sorting-order'
    );
    reverseSortingOrder.addEventListener(
      'change',
      this.#reverseSortingOrderClickHandler
    );
  }
}
