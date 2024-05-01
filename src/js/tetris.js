import Tetromino from './tetromino';
import I from './I';
import J from './J';
import L from './L';
import O from './O';
import S from './S';
import T from './T';
import Z from './Z';

export default class Tetris {
  get elements() {
    return {
      playingField: document.querySelector('.js-playing-field'),
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
      x: 4,
      y: -2,
      playingField: this.elements.playingField,
      rotation: rotationOptions[randomRotation],
      unitSize: `20px`,
    });
  }

  start() {
    this.shape = this.getRandomShape();
    this.drawShape();
  }

  drawShape() {
    this.elements.playingField.appendChild(this.shape);
    this.moveCurrentShape();
  }

  async moveCurrentShape() {
    try {
        if (this.shape.moveDown()) { 
          await this.sleep(700);
          this.moveCurrentShape();
        }
        else {
          return;
        }
    }
    catch(error) {
      console.error('there is an error');
    }
  }
}