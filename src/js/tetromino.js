import Block from './block';

export default class Tetromino {
  constructor({ x, y, playingField, rotation, unitSize }) {
    this.x = x;
    this.y = y;
    this.playingField = playingField;
    this.rotation = rotation;
    this.unitSize = unitSize;
    this.blocks = this.createBlocks();
  }

  createBlocks() {
    let options = this.constructor.blockOptions[this.rotation];
    return options.map(option => {
      return new Block({
        x: option.x + this.x,
        y: option.y + this.y,
        unitSize: this.unitSize,
        color: this.constructor.color,
      });
    });
  }

  draw() {
    this.blocks.forEach(block => this.playingField.appendChild(block.getHtmlElement()));
  }

  checkCollision(blocks) {
    return !blocks.every(block => {
      return block.y <= 19 && block.x >= 0 && block.x <= 9;
    });
  }

  clearBlocks() { 
    this.blocks.forEach(block => {
      this.playingField.removeChild(block.blockDiv);
    })
  }

  simulateMove(callback) {
    let currentValue = this.y;
    this.clearBlocks();
    callback();
    let newBlocks = this.createBlocks();
    if (this.checkCollision(newBlocks)) {
      this.y = currentValue;
      this.draw();
      return false;
    }
    else {
      this.blocks = newBlocks;
      this.draw();
      return true;
    }
  }

  moveDown() {
    return this.simulateMove(() =>
      this.y += 1
    );
  }

  moveLeft() {
    return this.simulateMove(() =>
      this.x -= 1
    );
  }

  moveRight() {
    return this.simulateMove(() =>
      this.x += 1
    );
  }

  rotate() {
    return this.simulateMove(() =>
      this.rotation %= 360
    );
  }
}
