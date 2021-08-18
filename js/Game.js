import {
  Cell
} from './Cell.js'
import {
  Counter
} from './Counter.js';
import {
  UI
} from './UI.js'


class Game extends UI {

  config = {
    numberOfRows: 4,
    numberOfCols: 4,
  }

  numberOfRows = null;
  numberOfCols = null;

  counter = new Counter;

  cells = [];
  cellElements = null;


  board = null;

  keyDown = null


  initialize() {
    this.handleElements()
    this.counter.init()
    this.newGame()
  }

  handleElements() {
    this.board = this.getElement(this.UISelectors.board)
  }


  newGame() {
    this.numberOfRows = this.config.numberOfRows
    this.numberOfCols = this.config.numberOfCols

    this.counter.setValue(256)

    this.generateCells()
    this.renderBoard()
    this.renderCells(2)

    this.cellElements = this.getElements(this.UISelectors.cells)


    this.handleKeyboard()

  }

  generateCells() {
    for (let row = 0; row < this.numberOfRows; row++) {
      this.cells[row] = [];
      for (let col = 0; col < this.numberOfCols; col++) {
        this.cells[row].push(new Cell(col, row));
      }
    }
  }


  renderCells(howMany) {
    let numberOfPlaceToAddValue = howMany;
    while (numberOfPlaceToAddValue) {
      const rowIndex = this.getRandom(0, this.numberOfRows - 1);
      const colIndex = this.getRandom(0, this.numberOfCols - 1);
      if (!this.cells[rowIndex][colIndex].value) {
        const value = this.cells[rowIndex][colIndex].generateValue()
        this.cells[rowIndex][colIndex].setValueInCell(value)
        this.cells[rowIndex][colIndex].setStyle()
        numberOfPlaceToAddValue--

      }
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  renderBoard() {
    this.cells.flat().forEach(cell => {
      this.board.insertAdjacentHTML('beforeend', cell.createElementHTML())
      cell.element = this.getElement(cell.selector)
      cell.setStyle()
    })
  }

  handleKeyboard() {
    document.addEventListener('keydown', this.updateBoard)
  }


  updateBoard = (e) => {

    const direction = this.getKeyDown(e)
    if (direction == 'wrong-key') return


    const cells = this.cells.flat()
    if (direction == 'right' || direction == 'down') {
      cells.reverse()
    }

    cells.filter(cell => cell.value).forEach(cell => {
      this.moveCell(cell, direction)
      cell.setStyle()
    })
    this.renderCells(1)


    this.updateStyles()
    console.log(this.cells.flat());
  }

  updateStyles() {
    this.cells.flat().forEach(cell => cell.setStyle())
  }


  moveCell(cell, direction) {
    switch (direction) {
      case 'left':
        return this.moveLeft(cell);
      case 'up':
        return this.moveUp(cell);
      case 'right':
        return this.moveRight(cell);
      case 'down':
        return this.moveDown(cell);

    }
  }

  moveLeft(cell) {
    let value = cell.value;
    let x = cell.x;
    let y = cell.y;

    let localCounter = 0;

    for (let col = cell.x - 1; col >= 0; col--) {
      if (!!this.cells[y][col].value) {
        if (value === this.cells[y][col].value) {
          this.cells[y][col].setValueInCell(value * 2)
          this.cells[y][col + 1].setValueInCell(null)

          localCounter += value * 2
          console.log(localCounter);
          return
        }
        return
      }
      this.cells[y][col].setValueInCell(value)
      value = this.cells[y][col].value
      this.cells[y][col + 1].setValueInCell(null)
    }

    this.counter.addPoints(localCounter)
  }

  moveRight(cell) {
    let value = cell.value;
    let x = cell.x;
    let y = cell.y;

    for (let col = cell.x + 1; col <= this.numberOfCols - 1; col++) {
      if (!!this.cells[y][col].value) {
        if (value === this.cells[y][col].value) {
          this.cells[y][col].setValueInCell(value * 2)
          this.cells[y][col - 1].setValueInCell(null)
          return
        }
        return
      }
      this.cells[y][col].setValueInCell(value)
      value = this.cells[y][col].value
      this.cells[y][col - 1].setValueInCell(null)
    }
  }

  moveUp(cell) {
    let value = cell.value;
    let x = cell.x;
    let y = cell.y;

    for (let row = cell.y - 1; row >= 0; row--) {
      if (!!this.cells[row][x].value) {
        if (value === this.cells[row][x].value) {
          this.cells[row][x].setValueInCell(value * 2)
          this.cells[row + 1][x].setValueInCell(null)
          return
        }
        return
      }
      this.cells[row][x].setValueInCell(value)
      value = this.cells[row][x].value
      this.cells[row + 1][x].setValueInCell(null)
    }
  }

  moveDown(cell) {
    let value = cell.value;
    let x = cell.x;
    let y = cell.y;

    for (let row = cell.y + 1; row <= this.numberOfRows - 1; row++) {
      if (!!this.cells[row][x].value) {
        if (value === this.cells[row][x].value) {
          this.cells[row][x].setValueInCell(value * 2)
          this.cells[row - 1][x].setValueInCell(null)
          return
        }
        return
      }
      this.cells[row][x].setValueInCell(value)
      value = this.cells[row][x].value
      this.cells[row - 1][x].setValueInCell(null)
    }
  }

  // moveLeft(cell) {
  //   if (cell.x > 0) {
  //     let colIndextoChange = cell.x - 1;

  //     if (this.cells[cell.y][colIndextoChange].value == cell.value) {
  //       this.cells[cell.y][colIndextoChange].placeValueInCell(cell.value * 2)
  //     }

  // while (!this.cells[cell.y][colIndextoChange].value && colIndextoChange > 0) {
  //   console.log(!!this.cells[cell.y][colIndextoChange].value);
  //   colIndextoChange--


  // }
  // this.cells[cell.y][cell.x].placeValueInCell(null)
  // this.cells[cell.y][colIndextoChange].placeValueInCell(30)
  //   }

  // }
  // moveRight() {

  // }
  // moveUp() {

  // }
  // moveDown() {

  // }



  getKeyDown(e) {
    switch (e.keyCode) {
      case 37:
        return 'left';
      case 38:
        return 'up';
      case 39:
        return 'right'
      case 40:
        return 'down';
      default:
        return 'wrong-key'
    }
  }

}


window.onload = function () {
  const game = new Game;
  game.initialize()
  console.log(game);
}