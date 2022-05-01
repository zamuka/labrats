import { CELL_SIZE } from '../config/constants.js';
import { Grid } from '../maze/grid.js';

export class Player {
  position = {
    x: -1,
    y: -1,
  }
  /**
   * @param {Grid} grid
   */
  constructor(grid) {
    this.grid = grid;
    this.element = document.createElement('div');
    this.element.className = 'player';
    this.element.innerText = '👨';
    grid.root?.appendChild(this.element);
  }

  /**
   *
   * @param {Point} position
   */
  setPosition(position) {
    this.position = position;
    this.draw();
  }

  draw() {
    this.element.style.left = this.position.x * CELL_SIZE + 'px';
    this.element.style.top = this.position.y * CELL_SIZE + 'px';
  }
}