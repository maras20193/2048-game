export class UI {
  UISelectors = {
    board: '[data-board]',
    cells: '[data-cell]',
    counter: '[data-counter]',
    counterIncrrement: '[data-counterIncrrement]'
  }

  getElement(selector) {
    return document.querySelector(selector)
  }
  getElements(selector) {
    return document.querySelectorAll(selector)
  }


}