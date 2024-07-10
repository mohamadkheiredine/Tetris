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
  }

  get elements() {
    return {
      playingField: document.querySelector('.js-playing-field'),
      nextShape: document.querySelector('.js-next-shape'),
      scoreField: document.querySelector('.js-score'),
      highScore: document.querySelector('.js-high-score'),
      gameOver: document.querySelector('.js-game-over'),
      pauseButton: document.querySelector('.js-pause'),
      newGame: document.querySelector('.js-new-game'),
      tetrisWord: document.querySelector('.js-tetris-word'),
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
      unitSize: 20,
      gridManager: this.gridManager,
    });
  }

  start() {
    this.sleepID = {};
    this.setupListeners();
    this.shape = this.getRandomShape();
    this.drawShape();
    this.elements.pauseButton.style.visibility = 'visible';
    this.elements.newGame.textContent = 'Restart';
    this.isRunning = true;
  }

  drawShape() {
    this.shape.x = 4;
    this.shape.y = -2;
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
    document.addEventListener('keydown', this.onKeyDown);
    this.elements.pauseButton.addEventListener('click', () => this.togglePause());
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
    if (this.onClearFourLine()) {
      this.score += 8;
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
    document.removeEventListener('keydown', this.onKeyDown);
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
      this.isPaused = false;
      this.moveCurrentShape();
    } else {
      this.elements.pauseButton.innerHTML = 'Continue';
      this.isPaused = true;
    }
}

  restart() {
    this.isRunning = false;
    this.removeListeners();
    this.clearAll();
    this.moveFast = false;
    this.start();
  }

  onClearFourLine() {
    if (this.gridManager.manageGrid() === 4) {
      tetrisWord.style.display = 'block';
    }
  }
}