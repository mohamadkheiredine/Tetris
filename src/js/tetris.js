import Tetromino from './tetromino';
import I from './I';
import J from './J';
import L from './L';
import O from './O';
import S from './S';
import T from './T';
import Z from './Z';
import GridManager from './grid-manager';

const KEYS = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  r: 82
};

export default class Tetris {
  constructor({gridManager}){
    this.gridManager = gridManager;
  }

  get elements() {
    return {
      playingField: document.querySelector('.js-playing-field'),
      nextShape: document.querySelector('.js-next-shape'),
    };
  }

  sleep(time) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), time);
    });
  }

  getRandomShape(){
    const shapes = [I,J,L,O,S,T,Z];
    let rotationOptions = [0, 90, 180, 270];
    let randomNumberShape = Math.floor(Math.random() * 7);
    let randomRotation = Math.floor(Math.random() * 4);
    
    return new shapes[randomNumberShape]({
      x: 0,
      y: 0,
      playingField: this.elements.playingField,
      rotation: rotationOptions[randomRotation],
      unitSize: 20,
      gridManager: this.gridManager, 
    });
  }

  start() {
    this.setupListeners();
    this.shape = this.getRandomShape();
    this.drawShape();
  }

  drawShape() {
    this.shape.x = 4;
    this.shape.y = -2;
    this.shape.draw(this.elements.playingField);
    this.drawNextShape();
    this.moveCurrentShape();
  }

  async moveCurrentShape() {
    if (!this.shape.moveDown()) {
      this.saveBlocks();
      this.shape = this.nextShape;
      this.drawShape();
      return; 
    } 
    
    await this.sleep(700); 
    this.moveCurrentShape(); 
  }
  
  setupListeners(){
    document.addEventListener('keydown', event => {
        switch(event.keyCode) {
          case (KEYS.left) :
            this.shape.moveLeft();
            break;
          case (KEYS.right) :
            this.shape.moveRight();
            break;
          case (KEYS.down) :
            this.shape.moveDown();
            break;
          case (KEYS.r) :
            this.shape.rotate();
            break;
          default : 
            break;
        }
    });
  }

  drawNextShape() {
    this.clearNextShape();
    this.nextShape = this.getRandomShape();
    this.nextShape.draw(this.elements.nextShape);
  }

  clearNextShape() {
    this.elements.nextShape.innerHTML = '';
  }

  saveBlocks() {
    this.gridManager.blocks.push(this.shape.blocks);
    this.gridManager.manageGrid();
  }
}