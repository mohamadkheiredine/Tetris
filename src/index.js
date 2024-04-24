import Block from './js/block';
import './styles/main.scss';

(() => {
  const playingField = document.querySelector('.js-playing-field');
  const redBlock = new Block({
    x: 0,
    y: 0,
    unitSize: 20,
    color: 'red'
  });

  const yellowBlock = new Block({
    x: 3,
    y: 3,
    unitSize: 20,
    color: 'yellow'
  });

  const orangeBlock = new Block({
    x: 2,
    y: 2,
    unitSize: 20,
    color: 'orange'
  });

  const magentaBlock = new Block({
    x: 0,
    y: 5,
    unitSize: 20,
    color: 'magenta'
  });

  const blueBlock = new Block({
    x: 1,
    y: 6,
    unitSize: 20,
    color: 'blue'
  });

  const limeBlock = new Block({
    x: 6,
    y: 4,
    unitSize: 20,
    color: 'lime'
  });

  const cyanBlock = new Block({
    x: 4,
    y: 10,
    unitSize: 20,
    color: 'cyan'
  });

  playingField.append(redBlock.getHtmlElement());
  playingField.append(blueBlock.getHtmlElement());
  playingField.append(yellowBlock.getHtmlElement());
  playingField.append(orangeBlock.getHtmlElement());
  playingField.append(magentaBlock.getHtmlElement());
  playingField.append(yellowBlock.getHtmlElement());
  playingField.append(limeBlock.getHtmlElement());
  playingField.append(cyanBlock.getHtmlElement());
})();


