import {
  UI
} from './UI.js'


export class Counter extends UI {

  value = null;
  element = null;

  lastAddedPoints = null;
  lastAddedPointsElement = null;

  init() {
    this.element = this.getElement(this.UISelectors.counter)
    this.lastAddedPointsElement = this.getElement(this.UISelectors.counterIncrrement)
  }

  setValue(value) {
    this.value = value;
    this.lastAddedPoints = 0;
    this.updateValueDOM()

  }

  updateValueDOM() {
    this.element.textContent = this.value
  }
  // updateIncrementValueDOM() {
  //   this.decrementClassDeactive()
  //   this.lastAddedPointsElement.textContent = `+${this.lastAddedPoints}`
  //   this.incrementClassActive()
  // }
  // incrementClassActive() {
  //   this.lastAddedPointsElement.classList.add('active')
  // }
  // decrementClassDeactive() {
  //   this.lastAddedPointsElement.classList.remove('active')
  // }

  addPoints(value) {
    this.value += value;
    this.lastAddedPoints = value
    this.updateValueDOM()
    // this.updateIncrementValueDOM()
  }


}