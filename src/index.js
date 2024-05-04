import Tetromino from "./js/tetromino";
import Tetris from "./js/tetris";
import Block from "./js/block";
import './styles/main.scss';

let tetris = new Tetris();
let newGameButton = document.querySelector('.js-new-game');

newGameButton.addEventListener('click', () => {
  tetris.start();
})();