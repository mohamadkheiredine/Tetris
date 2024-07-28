import Tetromino from './tetromino';
import I from './I';
import J from './J';
import L from './L';
import O from './O';
import S from './S';
import T from './T';
import Z from './Z';
import GridManager from './grid-manager';
import { CONSTANTS } from './value';

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
  constructor({ gridManager }) {
    this.gridManager = gridManager;
    this.score = 0;
    this.round = 1;
    this.moveFast = false;
    this.sleepID = {};
    this.highScore = 0;
    this.isPaused = false;
    this.isRunning = false;
    this.gameOver = false;
    this.ifMobile = false;
  }

  get elements() {
    return {
      playingField: document.querySelector('.js-playing-field'),
      nextShape: document.querySelector(window.innerWidth < 768 ? '.js-next-shape-mobile' : '.js-next-shape'),
      scoreField: document.querySelector(window.innerWidth < 768 ? '.js-score-mobile' : '.js-score'),
      highScore: document.querySelector('.js-high-score'),
      gameOver: document.querySelector(window.innerWidth < 768 ? '.js-game-over-mobile' : '.js-game-over'),
      pauseButton: document.querySelector('.js-pause'),
      newGame: document.querySelector('.js-new-game'),
      tetrisWord: document.querySelector('.js-tetris-word'),
      leftButton: document.querySelector('.js-mobile-left'),
      rightButton: document.querySelector('.js-mobile-right'),
      downButton: document.querySelector('.js-mobile-down'),
      upButton: document.querySelector('.js-mobile-up'),
      rotateButton: document.querySelector('.js-mobile-rotate'),
      pauseButtonMobile: document.querySelector('.js-mobile-pause'),
      playButton: document.querySelector('.js-mobile-play'),
    };
  }

  sleep(time) {
    return new Promise(resolve => {
      const id = this.sleepID;
      setTimeout(() => {
        if (id === this.sleepID) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, time);
    });
  }

  getRandomShape() {
    const shapes = [I, J, L, O, S, T, Z];
    const rotationOptions = [0, 90, 180, 270];
    const randomNumberShape = Math.floor(Math.random() * 7);
    const randomRotation = Math.floor(Math.random() * 4);

    return new shapes[randomNumberShape]({
      x: 0,
      y: 0,
      playingField: this.elements.playingField,
      rotation: rotationOptions[randomRotation],
      unitSize: window.innerWidth < 768 ? this.gridManager.unitSize * 0.6 : this.gridManager.unitSize,
      gridManager: this.gridManager,
    });
  }

  start() {
    this.elements.playButton.classList.remove('tetris__controller-icon_is-play-icon');
    this.elements.playButton.classList.add('tetris__controller-icon_is-restart-icon');
    this.elements.pauseButtonMobile.classList.remove('tetris__controller-icon_is-play-icon');
    this.elements.pauseButtonMobile.classList.add('tetris__controller-icon_is-pause-icon');
    this.isRunning = true;
    this.gameOver = false;
    this.sleepID = {};
    this.setupListeners();
    this.shape = this.getRandomShape();
    this.drawShape();
    this.elements.pauseButton.style.visibility = 'visible';
    this.elements.newGame.textContent = 'Restart';
  }

  drawShape() {
    this.shape.x = 4;
    this.shape.y = -2;
    this.shape.unitSize = this.gridManager.unitSize;
    this.shape.draw(this.elements.playingField);
    this.drawNextShape();
    this.moveCurrentShape();
  }

  async moveCurrentShape() {
    if (this.gameOver) {
      return;
    }

    if (!this.shape.moveDown()) {
      this.moveFast = false;
      this.saveBlocks();
      if (this.checkGameOver()) {
        this.onGameOver();
      } else {
        this.round++;
        this.shape = this.nextShape;
        this.drawShape();
      }
      return;
    }
    const canContinue = await this.sleep(this.moveFast ? FASTSLEEP : this.getSleepDuration());
    if (canContinue && !this.isPaused) {
      this.moveCurrentShape();
    }
  }

  setupListeners() {
    this.onKeyDown = event => {
      if (event.keyCode === KEYS.space) {
        this.togglePause();
      } else if (!this.isPaused) {
        switch (event.keyCode) {
          case KEYS.left:
            this.shape.moveLeft();
            break;
          case KEYS.right:
            this.shape.moveRight();
            break;
          case KEYS.down:
            this.shape.moveDown();
            break;
          case KEYS.up:
            this.sleepID = {};
            this.moveFast = true;
            this.moveCurrentShape();
            break;
          case KEYS.r:
            this.shape.rotate();
            break;
        }
      }
    };

    this.onClickUpButton = event => {
      this.sleepID = {};
      this.moveFast = true;
      this.moveCurrentShape();
    }
    this.onClickMoveLeft = event => {
      this.shape.moveLeft();
    }
    this.onClickMoveRight = event => {
      this.shape.moveRight();
    }
    this.onClickMoveDown = event => {
      this.shape.moveDown();
    }
    this.onClickRotate = event => {
      this.shape.rotate();
    }
    this.onClickPause = event => {
      this.togglePause();
    }
    this.onPause = () => this.togglePause();
    this.elements.pauseButton.addEventListener('click', this.onPause);


    document.addEventListener('keydown', this.onKeyDown);
    this.elements.leftButton.addEventListener('click', this.onClickMoveLeft);
    this.elements.rightButton.addEventListener('click', this.onClickMoveRight);
    this.elements.downButton.addEventListener('click', this.onClickMoveDown);
    this.elements.upButton.addEventListener('click', this.onClickUpButton);
    this.elements.rotateButton.addEventListener('click', this.onClickRotate);
    this.elements.pauseButtonMobile.addEventListener('click', this.onClickPause);
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
    const numberOfRemovedLines = this.gridManager.manageGrid();
    this.score += numberOfRemovedLines;
    this.elements.scoreField.innerHTML = this.score;
    if (numberOfRemovedLines === 4) {
      this.onClearFourLine();
      this.score += 4;
      this.elements.scoreField.innerHTML = this.score;
      setTimeout(() => {
        this.elements.tetrisWord.style.display = 'none';
      },1000);
    }
  }

  getSleepDuration() {
    return 1000 * Math.pow(0.9, Math.floor(this.round / 10));
  }

  checkGameOver() {
    return this.gridManager.blocks.some(block => block.y === 0);
  }

  onGameOver() {
    this.elements.highScore.style.display = 'flex';
    this.elements.highScore.style.justifyContent = 'center';
    this.elements.highScore.style.alignItems = 'center';

    this.elements.gameOver.style.display = 'flex';
    this.elements.gameOver.style.justifyContent = 'center';
    this.elements.gameOver.style.alignItems = 'center';

    if (this.score > this.highScore) {
      this.highScore = this.score;
    }

    this.elements.highScore.textContent = this.highScore;

    localStorage.setItem('tetrisHighScore', this.highScore);
    this.removeListeners();
    this.isRunning = false;
    this.gameOver = true;
  }

  loadHighScore() {
    this.highScore = localStorage.getItem('tetrisHighScore') || 0;
    this.elements.highScore.innerHTML = this.highScore;
  }

  removeListeners() {
    console.log('Removing listeners');
    document.removeEventListener('keydown', this.onKeyDown);
    this.elements.pauseButton.removeEventListener('click', this.onPause);
    this.elements.leftButton.removeEventListener('click', this.onClickMoveLeft);
    this.elements.rightButton.removeEventListener('click', this.onClickMoveRight);
    this.elements.downButton.removeEventListener('click', this.onClickMoveDown);
    this.elements.upButton.removeEventListener('click', this.onClickUpButton);
    this.elements.rotateButton.removeEventListener('click', this.onClickRotate);
    this.elements.pauseButtonMobile.removeEventListener('click', this.onClickPause);
    console.log('remove listener done');
  }

  clearAll() {
    this.elements.playingField.innerHTML = '';
    this.gridManager.blocks = []; 
    this.score = 0;
    this.round = 1;
    this.moveFast = false;
    this.isPaused = false;
    this.sleepID = {};
    this.clearNextShape();
    this.elements.gameOver.style.display = 'none';
    this.elements.scoreField.innerHTML = this.score;
    this.elements.pauseButton.innerHTML = 'Pause';
  }

  togglePause() {
    this.sleepID = {};
    if (this.isPaused) {
      this.elements.pauseButton.innerHTML = 'Pause';
      this.elements.pauseButtonMobile.classList.remove('tetris__controller-icon_is-play-icon');
      this.elements.pauseButtonMobile.classList.add('tetris__controller-icon_is-pause-icon');
      this.isPaused = false;
      this.moveCurrentShape();
    } else {
      this.elements.pauseButton.innerHTML = 'Continue';
      this.elements.pauseButtonMobile.classList.add('tetris__controller-icon_is-play-icon');
      this.elements.pauseButtonMobile.classList.remove('tetris__controller-icon_is-pause-icon');
      this.isPaused = true;
    }
}

  restart() {
    console.log('restrat function here');
    this.isRunning = false;
    this.removeListeners();
    this.clearAll();
    this.moveFast = false;
    this.isPaused = false;
    console.log('should restart');
    this.start();
}

  onClearFourLine() {
    this.elements.tetrisWord.style.display = 'block';
  }
}
