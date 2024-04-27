import Tetromino from './tetromino';

export default class J extends Tetromino {
  static get color() {
    return 'blue';
  }

  static get blockOptions() {
    return {
      0: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
      90: [{ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 }],
      180: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
      270: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }]
    };
  }
}