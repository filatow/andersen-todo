
export const getNewItemInputGroupMarkup = () => {
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

export const getSortAndFilterPanelMarkup = () => {
  const sortAndFilterPanelMarkup = `
  <div class="d-none" id="sort-and-filter-panel">
    <div
      class="row row-cols-lg-auto g-3 align-items-center text-white mb-3"
    >
      <div class="col">
        <span class="fs-6 fw-bold">Sort by</span>
      </div>
      <div class="col">
        <select class="form-select" id="sorting-type-select">
          <option value="unsorted" selected>Choose...</option>
          <option value="by-text">Text</option>
          <option value="by-creation-date">Creation date</option>
          <option value="by-expiration-date">
            Expiration date
          </option>
        </select>
      </div>
      <div class="col">
        <div class="form-check">
          <label
            class="form-check-label"
            for="reverse-sorting-order"
          >
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
    <div class="row mb-1 text-white">
      <div class="col">
        <span class="fs-6 fw-bold">Search by :</span>
      </div>
    </div>
    <div class="row text-white">
      <div class="col">
        <label for="search-by-text-input" class="form-label"
          >Text</label
        >
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="search-by-text-input"
            placeholder="Enter text..."
          />
        </div>
      </div>
      <div class="col">
        <label for="search-by-creation-date-input" class="form-label"
          >Creation date</label
        >
        <input
          type="date"
          class="form-control"
          id="search-by-creation-date-input"
        />
      </div>
      <div class="col">
        <label for="search-by-expiration-date-input" class="form-label"
          >Expiration date</label
        >
        <input
          type="date"
          class="form-control"
          id="search-by-expiration-date-input"
        />
      </div>
    </div>
  </div>`;

  return sortAndFilterPanelMarkup;
};

export const getTodoListMarkup = (todoItemsMarkup = '') => {
  const todoListMarkup = `<ul class="list-group mb-3">${todoItemsMarkup}</ul>`;

  return todoListMarkup;
};

export const getNewItemCreateModalMarkup = (itemCreationDate, itemExpirationDate) => {
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

export const getEditItemModalMarkup = (itemCreationDate, itemExpirationDate) => {
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

export const getFilterBarMarkup = () => {
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
