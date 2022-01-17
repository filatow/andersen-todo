import { nanoid } from 'nanoid';

const CHARS_IN_ID = 8;

export class TodoItem {
  #id;
  #todoItem;
  #isDone = false;

  constructor(item) {
    this.#todoItem = item;
    this.#id = nanoid(CHARS_IN_ID);
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
        ${this.#todoItem}
      </label>
    </li>`;
  }

  // markAsDone() {
  //   this.#isDone = true;
  // }
  get isDone() {
    return this.#isDone;
  }

  set isDone(value) {
    this.#isDone = value;
  }

  getId() {
    return this.#id;
  }
}
