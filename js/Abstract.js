export class Abstract {
  #state = {};
  #binding = {};
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
  }
  
  get state() { // temporary; for debug only
    return this.#state;
  }
  get binding() { // temporary; for debug only
    return this.#binding;
  }
  
  getState(variable) {
    return this.#state[variable]
  }

  setState(variable, value) {
    if (typeof variable !== 'string') return;
    this.#state[variable] = value;

    this.updateBinding(variable);
  }
  
  setBinding(stateVariable, bindedElement, format, property = 'value') {
    if (typeof property !== 'string') return;

    function updateElementValue(newValue) {
      if (typeof(format) === 'function') {
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

  updateBinding(variable) {
    if (!this.#binding[variable]) {
      return;
    };

    this.#binding[variable].forEach((updateFunc) => {
      updateFunc(this.#state[variable]);
    });
  }
}