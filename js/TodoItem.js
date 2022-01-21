import { nanoid } from 'nanoid';
import { Abstract } from './Abstract';
import { DAY_IN_MS } from './consts';
import { formatDate } from './utils';

const CHARS_IN_ID = 8;

export class TodoItem extends Abstract {
  #id;
  #text;
  #isDone = false;
  #creationDate;
  #expirationDate;

  constructor(text, creationDate, expirationDate) {
    super();
    this.#id = nanoid(CHARS_IN_ID);
    this.#text = text;
    this.#creationDate = creationDate || formatDate(new Date());
    this.#expirationDate =
      expirationDate ||
      formatDate(new Date(Date.parse(this.#creationDate) + DAY_IN_MS));
  }

  get text() {
    return this.#text;
  }

  set text(value) {
    this.#text = value;
  }

  get id() {
    return this.#id;
  }

  get isDone() {
    return this.#isDone;
  }

  set isDone(value) {
    this.#isDone = value;
  }

  get creationDate() {
    return this.#creationDate;
  }

  set creationDate(value) {
    this.#creationDate = value;
  }

  get expirationDate() {
    return this.#expirationDate;
  }

  set expirationDate(value) {
    this.#expirationDate = value;
  }

  getMarkup() {
    return `
    <li
      class="list-group-item list-group-item-warning d-flex justify-content-between align-items-center"
      data-id=${this.#id}
    >
      <label ${
        this.#isDone
          ? 'class="text-decoration-line-through text-secondary"'
          : ''
      }>
        <input
          class="form-check-input me-1"
          type="checkbox"
          ${this.#isDone ? 'checked' : ''}
          ${this.#isDone ? 'disabled' : ''}
        />
        ${this.#text}
      </label>
      <div>
        <button type="button" class="btn btn-outline-danger delete-item" title="delete item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"    fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <button
          type="button"
          class="btn btn-outline-primary edit-item"
          title="edit item"
          data-bs-toggle="modal"
          data-bs-target="#edit-item-modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </button>
      </div>
    </li>`;
  }
}
