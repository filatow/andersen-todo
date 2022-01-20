import { nanoid } from 'nanoid';
import { Abstract } from './Abstract';
import { DAY_IN_MS } from './consts';

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
    this.#creationDate = creationDate || new Date();
    this.#expirationDate =
      expirationDate || new Date(Date.parse(this.#creationDate) + DAY_IN_MS);
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
      <label class="${
        this.#isDone ? 'text-decoration-line-through text-secondary' : ''
      }">
        <input
          class="form-check-input me-1"
          type="checkbox"
          ${this.#isDone ? 'checked' : ''}
          ${this.#isDone ? 'disabled' : ''}
        />
        ${this.#text}
      </label>
      <div>
        <button type="button" class="btn btn-outline-secondary delete-item" title="delete item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"    fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
    </li>`;
  }
}
