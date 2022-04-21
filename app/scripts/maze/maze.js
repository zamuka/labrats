/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
export function cellId(x, y) {
  return `x${x}y${y}`;
}

export class Maze {
  /**
   * @type HTMLElement | null;
   */
  root;

  /**
   * @type number;
   */
  width;

  /**
   * @type number;
   */
  height;
  /**
   *
   * @param {number} width
   * @param {number} height
   * @param {HTMLElement | string} root DOM node or selector
   */
  constructor(width, height, root) {
    this.root = root instanceof Element ? root : document.querySelector(root);
    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    if (!this.root) {
      return;
    }
    const cells = [];
    for (let y = 0; y < this.height; y = y + 1) {
      for (let x = 0; x < this.width; x = x + 1) {
        const cell = document.createElement('div');
        cell.id = cellId(x, y);
        cells.push(cell);
      }
    }
    this.root.style.gridTemplateColumns = `repeat(${this.width}, 20px)`
    this.root.style.gridTemplateRows = `repeat(${this.height}, 20px)`
    this.root.append(...cells);
  }

  setCell(x, y, material) {
    const cell = document.getElementById(cellId(x, y));
    if (cell) {
      cell.className = material;
    }
  }

}