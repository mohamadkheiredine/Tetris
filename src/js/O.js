import Tetromino from './tetromino';

export default class O extends Tetromino {
  static get color() {
    return 'yellow';
  }

  static get blockOptions() {
    return {
      0: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
      90: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
      180: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
      270: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 2, y: 1 }]
    };
  }
}