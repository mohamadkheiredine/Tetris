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
        x: (option.x + this.x),
        y: (option.y + this.y),
        unitSize: this.unitSize,
        color: this.constructor.color,
      });
    });
  }

  draw() {
    this.blocks.forEach(block => { this.playingField.appendChild(block.getHtmlElement()); });
  }
}