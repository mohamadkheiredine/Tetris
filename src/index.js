import I from './js/I';
import './styles/main.scss';

(() => {
  const playingField = document.querySelector('.js-playing-field');
  const iShape = new I({
    x: 2,
    y: 0,
    playingField,
    rotation: 0,
    unitSize: 20
  });
  iShape.draw();
})();
