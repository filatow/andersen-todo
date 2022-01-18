import { nanoid } from 'nanoid';

const CHARS_IN_ID = 8;
const MS_IN_DAY = 86_400_000;

export class TodoItem {
  #id;
  #text;
  #isDone = false;
  #creationDate;
  #expirationDate;

  constructor(text, creationDate, expirationDate) {
    this.#id = nanoid(CHARS_IN_ID);
    this.#text = text;
    this.#creationDate = creationDate || new Date();
    this.#expirationDate =
      expirationDate || new Date( Date.parse(this.#creationDate) + MS_IN_DAY );
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
      class="list-group-item list-group-item-warning"
      data-id=${this.#id}
    >
      <label class="${this.#isDone ? 'text-decoration-line-through' : ''}">
        <input
          class="form-check-input me-1"
          type="checkbox"
          ${this.#isDone ? 'checked' : ''}
          ${this.#isDone ? 'disabled' : ''}
        />
        ${this.#text}
      </label>
    </li>`;
  }
}
