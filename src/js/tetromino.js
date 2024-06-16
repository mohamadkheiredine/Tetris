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

  draw(elements) {
    this.blocks.forEach(block => elements.appendChild(block.getHtmlElement()));
  }

  checkCollision(blocks) {
    return !blocks.every(block => block.y <= 19 && block.x >= 0 && block.x <= 9) || this.gridManager.blocks.some(block => blocks.find(b => b.x === block.x && b.y === block.y));
  }

  clearBlocks() { 
    this.blocks.forEach(block => {
      this.playingField.removeChild(block.blockDiv);
    })
  }

  simulateMove(callback) {
    let {x, y, rotation} = this;
    this.clearBlocks();
    callback();
    let newBlocks = this.createBlocks();
    if (this.checkCollision(newBlocks)) {
      this.y = y;
      this.x = x;
      this.rotation = rotation;
      this.draw(this.playingField);
      return false;
    }
    else {
      this.blocks = newBlocks;
      this.draw(this.playingField);
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
      this.rotation = (this.rotation + 90) % 360
    );
  }
}
