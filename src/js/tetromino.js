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
      new Block({
        x: option[0],
        y: option[1],
        unitSize: this.unitSize,
        color: this.constructor.color,
      });
    });
  }

  draw() {
    let shape = document.createElement('div');
    let options =Object.keys(this.constructor.blockOptions);
    let rotation = this.rotation;
    
    this.constructor.blockOptions.forEach(element => {
      if (element === rotation){
        let block = this.createBlocks(); //??
        shape.appendChild(block); // ??
      }
    });
    shape.style.left = `${this.x}px`;
    shape.style.top = `${this.y}px`;
    this.playingField.appendChild(shape);
    return shape;
  }
}