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
    let numberOfRemovedLines = 0;
    for (let block of linesObject.blocksToRemove) {
      this.playingField.removeChild(block.blockDiv);
      this.blocks.splice(this.blocks.indexOf(block),1);
      this.reorderBlocks();
      numberOfRemovedLines++;
    }
    return numberOfRemovedLines;
  }

  reorderBlocks() {
    let linesIndexes = this.getLinesToClear();
    let currentY;
    let modifiedBlocks = [];

    this.blocks.forEach(block => {
      this.playingField.removeChild(block.blockDiv);
    });

    for (let i = 0 ; i < this.blocks.length ; i++) {
      for (let j = 0 ; j < linesIndexes.lineIndices.length ; j++) {
        if (this.blocks[i].y === linesIndexes[i]) {
          currentY = linesIndexes[i];
          break;
        }
      }
      break;
    }

    for (let i = 0 ; i < this.blocks.length ; i++) {
      if (this.blocks.y < currentY) {
        this.blocks.y = this.blocks.y + (currentY - this.blocks.y);
        modifiedBlocks.push(this.blocks[i]);
      }
    }

    modifiedBlocks.forEach(block => {
      this.playingField.appendChild(block.blockDiv);
    });
    
    this.blocks = modifiedBlocks;

    return this.blocks;
  }
}