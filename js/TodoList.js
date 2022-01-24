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
import {
  getNewItemInputGroupMarkup,
  getSortAndFilterPanelMarkup,
  getTodoListMarkup,
  getNewItemCreateModalMarkup,
  getEditItemModalMarkup,
  getFilterBarMarkup
} from './markup/TodoList';

export class TodoList extends Abstract {
  #container;
  #todoItems = [];
  #defaultListItemCreationDate;
  #defaultListItemExpirationDate;
  #viewSetting = {
    status: filterByStatus.ALL,
    sorting: sortingType.UNSORTED,
    searchByText: null,
    searchByCreationDate: null,
    searchByExpirationDate: null,
    isReversed: false,
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

  #updateListOfItems = () => {
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

    if (this.#viewSetting.searchByText) {
      itemsToShow = itemsToShow.filter((item) =>
        item.text.includes(this.#viewSetting.searchByText)
      );
    }

    if (this.#viewSetting.searchByCreationDate) {
      itemsToShow = itemsToShow.filter((item) =>
        item.creationDate === this.#viewSetting.searchByCreationDate
      );
    }

    if (this.#viewSetting.searchByExpirationDate) {
      itemsToShow = itemsToShow.filter((item) =>
        item.expirationDate === this.#viewSetting.searchByExpirationDate
      );
    }

    if (this.#viewSetting.isReversed) itemsToShow.reverse();

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
    this.#viewSetting.isReversed = evt.target.checked;
    this.#updateListOfItems();
  };

  #searchByTextInputInputHandler = (evt) => {
    this.#viewSetting.searchByText = evt.target.value;
    this.#updateListOfItems();
  };

  #searchByCreationDateChangeHandler = (evt) => {
    this.#viewSetting.searchByCreationDate = evt.target.value;
    this.#updateListOfItems();
  };

  #searchByExpirationDateChangeHandler = (evt) => {
    this.#viewSetting.searchByExpirationDate = evt.target.value;
    this.#updateListOfItems();
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

    const searchByTextInput = this.#container.querySelector(
      '#search-by-text-input'
    );
    searchByTextInput.addEventListener(
      'input',
      this.#searchByTextInputInputHandler
    );

    const searchByCreationDateInput = this.#container.querySelector(
      '#search-by-creation-date-input'
    );
    searchByCreationDateInput.addEventListener(
      'change',
      this.#searchByCreationDateChangeHandler
    );

    const searchByExpirationDateInput = this.#container.querySelector(
      '#search-by-expiration-date-input'
    );
    searchByExpirationDateInput.addEventListener(
      'change',
      this.#searchByExpirationDateChangeHandler
    );
  }
}
