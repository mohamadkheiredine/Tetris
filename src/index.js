import Tetromino from "./js/tetromino";
import Tetris from "./js/tetris";
import Block from "./js/block";
import './styles/main.scss';
import GridManager from "./js/grid-manager";

(() => {
  const playingField = document.querySelector('.js-playing-field');
  let gridManager = new GridManager({ playingField });
  let tetris = new Tetris({ gridManager });
  tetris.loadHighScore();
  const start = () => {
    if (!tetris.isRunning) {
      if (tetris.gameOver) {
        tetris.clearAll();
      }
      tetris.start();
    } else {
      console.log('Game is already running');
      tetris.restart();
    }
  }
  document.querySelector('.js-new-game').addEventListener('click', () => {
    start();
  });
  document.querySelector('.js-mobile-play').addEventListener('click', () => {
    start();
  });
})();