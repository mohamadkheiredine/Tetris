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
  if (window.innerWidth < 768) {
    document.querySelector('.js-mobile-play').addEventListener('click', () => {
      if (!tetris.isRunning) {
        if (tetris.gameOver) {
          tetris.clearAll();
        }
        tetris.start();
      } else {
        tetris.restart();
      }
    });
  } else {
    document.querySelector('.js-new-game').addEventListener('click', () => {
      if (!tetris.isRunning) {
        if (tetris.gameOver) {
          tetris.clearAll();
        }
        tetris.start();
      } else {
        tetris.restart();
      }
    });
    }
})();