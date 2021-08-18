import {
  UI
} from './UI.js'


export class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = null;
    this.selector = `[data-x="${this.x}"][data-y="${this.y}"]`;
    this.element = null;
    this.colorStyle = null;
  }

  createElementHTML() {
    const element = `<div class="cell" data-cell data-x="${this.x}" data-y="${this.y}"></div>`
    return element
  }

  generateValue() {
    const posibleValue = [2, 2, 2, 2, 4]
    return posibleValue[Math.floor(Math.random() * posibleValue.length)]
  }
  setValueInCell(value) {
    const cell = document.querySelector(this.selector)
    this.value = value
    cell.textContent = this.value
  }

  setStyle() {
    const color = `cell cell--color-${this.value}`
    this.colorStyle = color
    this.element.className = this.colorStyle;
  }
}