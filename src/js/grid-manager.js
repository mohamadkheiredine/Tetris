import Tetris from "./tetris";
import Tetromino from "./tetromino";

export default class GridManager {
  constructor ({playingField}) {
    this.playingField = playingField;
    this.blocks = [];
  }

  getLinesToClear() {
    let rows = [];
    let blocksToRemove = [];
    let toRemoveIndexes = [];
    
    this.blocks.forEach(block => {
      rows[block.y] = rows[block.y] ? [...rows[block.y], block] : [block];
    });

    rows.forEach((blocks, index) => {
      if (blocks.length === 10) { 
        toRemoveIndexes.push(index);
        blocksToRemove = [...blocksToRemove, ...blocks]; 
      }
    });

    return {
      lineIndices: toRemoveIndexes,
      blocksToRemove: blocksToRemove,
    };
  }

  manageGrid() {
    let linesObject = this.getLinesToClear();
    for (let block of linesObject.blocksToRemove) {
      this.playingField.removeChild(block.blockDiv);
      linesObject.blocksToRemove.splice(this.blocks.indexOf(block),1);
    }
  }
}