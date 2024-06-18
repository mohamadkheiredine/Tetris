import Tetris from "./tetris";
import Tetromino from "./tetromino";
import Block from "./block";

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
      this.blocks.splice(this.blocks.indexOf(block),1);
    }
    this.blocks = this.reorderBlocks();
    return linesObject.blocksToRemove.length;
  }

  reorderBlocks() {
    let linesObject = this.getLinesToClear();
    let linesIndexes = linesObject.lineIndices;
  
    this.blocks.forEach(block => {
      this.playingField.removeChild(block.blockDiv);
    });
  
    let newBlocks = this.blocks.map(block => {
      return new Block({
        x: block.x,
        y:  linesIndexes.every(y => block.y > y) ? block.y : block.y + linesIndexes.filter(y => block.y < y).length,
        unitSize: block.unitSize,
        color: block.color
      });
    });
  
    newBlocks.forEach(block => {
      this.playingField.appendChild(block.getHtmlElement());
    });
  
    return newBlocks;
  }
}