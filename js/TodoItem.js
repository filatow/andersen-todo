export class TodoItem {
  #todoItem;

  constructor(item) {
    this.#todoItem = item;
  }

  getMarkup() {
    return `
    <li class="list-group-item list-group-item-warning">
      <label>
        <input
          class="form-check-input me-1"
          type="checkbox"
        />
        ${this.#todoItem}
      </label>
    </li>`
  }

}
