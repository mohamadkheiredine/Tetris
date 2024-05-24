import Tetris from "./tetris";
import Tetromino from "./tetromino";

export default class GridManager {
  constructor (playingField) {
    this.playingField = document.querySelector('.js-playing-field');
    this.blocks = [];
  }

  getLinesToClear() {
    let rows = [];
    let blocksToRemove = [];
    
    for (let i = 0; i < this.blocks.length; i++) {
      let nbOfBlockInsideSubArray = 0;
      for (let j = 0; j < this.blocks[i].length; j++) {
        if (this.blocks[i][j]) { 
          nbOfBlockInsideSubArray++;
        }
      }
      
      if (nbOfBlockInsideSubArray === this.blocks[i].length) {
        rows.push(i); 
        blocksToRemove.push(...this.blocks[i]); 
      }
    }
  
    return {
      lineIndices: rows,
      blocksToRemove: blocksToRemove,
    };
  }

  manageGrid() {
    let linesObject = this.getLinesToClear();
    for (let blocks of linesObject.blocksToRemove) {
      for (let block of blocks) {
        block = this.playingField.removeChild(block.getHtmlElement());
      }
    }
    
    for (let i = 0 ; i < linesObject.blocksToRemove.length ; i++) {
      linesObject.blocksToRemove.splice(i,1);
    }
  }

  
}