export default class Block {
  constructor({ x, y, unitSize, color }) {
    this.x = x;
    this.y = y;
    this.unitSize = unitSize;
    this.color = color;
  }

  serialize() {
    //This will be changed later
    return null;
  }
  
  getHtmlElement() {
    let block = document.createElement('div');
    let colorOfTheBlock = this.color;
    block.classList.add("block");
    block.classList.add(`block_color_${colorOfTheBlock}`);
    block.style.width = `${this.unitSize}px`; 
    block.style.height = `${this.unitSize}px`;
    block.style.top = `${this.y * this.unitSize}px`;
    block.style.left = `${this.x * this.unitSize}px`;
    
    return block;
  }
}
