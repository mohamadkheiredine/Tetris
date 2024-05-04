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
    this.blockDiv = document.createElement('div');
    this.blockDiv.classList.add("block");
    this.blockDiv.classList.add(`block_color_${this.color}`);
    this.blockDiv.style.width = `${this.unitSize}px`; 
    this.blockDiv.style.height = `${this.unitSize}px`;
    this.blockDiv.style.top = `${this.y * this.unitSize}px`;
    this.blockDiv.style.left = `${this.x * this.unitSize}px`;
    
    return this.blockDiv;
  }
}
