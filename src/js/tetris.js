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

const FASTSLEEP = 5;

export default class Tetris {
  constructor({gridManager}){
    this.gridManager = gridManager;
    this.score = 0;
    this.round = 1;
    this.moveFast = false;
    this.sleepID = {};
  }

  get elements() {
    return {
      playingField: document.querySelector('.js-playing-field'),
      nextShape: document.querySelector('.js-next-shape'),
      scoreField: document.querySelector('.js-score'),
    };
  }
  

  sleep(time) {
    return new Promise(resolve => {
      let id = this.sleepID;
      setTimeout(() => {
        if (id === this.sleepID) {
          resolve(true);
        } else {
          resolve(false)
        }
      }, time);
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
      this.moveFast = false;
      this.saveBlocks();
      this.round++;
      this.shape = this.nextShape;
      this.drawShape();
      return; 
    } 
    const canContinue = await this.sleep(this.moveFast ? FASTSLEEP : this.getSleepDuration());
    if (canContinue) {
      this.moveCurrentShape();
    }
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
          case (KEYS.up) :
            this.sleepID = {};
            this.moveFast = true;
            this.moveCurrentShape();
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
    this.gridManager.blocks = [...this.gridManager.blocks, ...this.shape.blocks];
    let numberOfRemovedLines = this.gridManager.manageGrid();
    this.score += numberOfRemovedLines;
    this.elements.scoreField.innerHTML = this.score;
  }

  getSleepDuration() {
    return 1000 * Math.pow(0.9, Math.floor(this.round / 10));
  }
}