import Tetromino from './tetromino';

export default class S extends Tetromino {
  static get color() {
    return 'lime';
  }

  static get blockOptions() {
    return {
      0: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      90: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1}, { x: 2, y: 2 }],
      180: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
      270: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
    };
  }
}