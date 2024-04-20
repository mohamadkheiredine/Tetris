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
  
  getColor(){
    return this.color;
  }

  getHtmlElement() {
    let block = document.createElement('div');
    let colorOfTheBlock = this.getColor();
    block.classList.add('block_color_' + colorOfTheBlock);
    block.style.width = this.unitSize + 'px'; 
    block.style.height = this.unitSize + 'px';
    block.style.marginTop = (this.y * this.unitSize) + 'px';
    block.style.marginLeft = (this.x * this.unitSize) + 'px';
    block.style.borderWidth = '4px'; 
    
    
    if (colorOfTheBlock === 'red'){
      block.style.backgroundColor = '#FF0000';
      block.style.borderColor = '#FF6666 #CC0000 #CC0000 #FF6666';
    }
    else if (colorOfTheBlock === 'orange'){
      block.style.backgroundColor = '#FF6600';
      block.style.borderColor = '#FF9933 #CC6600 #CC6600 #FF9933';
    }
    else if (colorOfTheBlock === 'magenta'){
      block.style.backgroundColor = '#CC00FF';
      block.style.borderColor = '#CC66FF #9900CC #9900CC #CC66FF';
    }
    else if (colorOfTheBlock === 'blue'){
      block.style.backgroundColor = '#0000FF';
      block.style.borderColor = '#6666FF #0000CC #0000CC #6666FF';
    }
    else if (colorOfTheBlock === 'lime'){
      block.style.backgroundColor = '#00FF00';
      block.style.borderColor = '#66FF66 #00CC00 #00CC00 #66FF66';
    }
    else if (colorOfTheBlock === 'yellow'){
      block.style.backgroundColor = '#FFFF00';
      block.style.borderColor = '#FFFF99 #FFCC00 #FFCC00 #FFFF99';
    }
    else if (colorOfTheBlock === 'cyan'){
      block.style.backgroundColor = '#66CCFF';
      block.style.borderColor = '#99FFFF #3399CC #3399CC #99FFFF';
    }
    
    return block;
}
}
