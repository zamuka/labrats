import { CELL_SIZE } from "../config/constants.js";
import { Game } from "../game/game.js";

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
export function cellId(x, y) {
  return `x${x}y${y}`;
}

export class Grid {
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
   * @type Game
   */
  game;
  /**
   * @param {HTMLElement | string} root DOM node or selector
   * @param {Game} game root DOM node or selector
   */
  constructor(root, game) {
    this.game = game;
    this.root = root instanceof Element ? root : document.querySelector(root);
    this.width = game.width;
    this.height = game.height;
    this.init();
  }

  init() {
    this.createCells();
    this.update();
  }

  /**
   *
   * @param {(x: number, y: number) => void} cellFunction
   * @returns
   */
  forEachCell(cellFunction) {
    for (let y = 0; y < this.height; y = y + 1) {
      for (let x = 0; x < this.width; x = x + 1) {
        cellFunction(x, y);
      }
    }
  }

  createCells() {
    if (!this.root) {
      return;
    }
    /**
     * @type HTMLElement[];
     */
    const cells = [];
    this.forEachCell((x, y) => {
      const cell = document.createElement('div');
      cell.id = cellId(x, y);
      cells.push(cell);
    })
    this.root.style.gridTemplateColumns = `repeat(${this.width}, ${CELL_SIZE}px)`
    this.root.style.gridTemplateRows = `repeat(${this.height}, ${CELL_SIZE}px)`
    this.root.append(...cells);
  }

  /**
   *
   * @param {Point} position
   * @param {string} material
   */
  setCell({ x, y }, material) {
    const cell = document.getElementById(cellId(x, y));
    if (cell) {
      cell.className = material;
    }
  }

  update() {
    this.forEachCell((x, y) => {
      this.setCell({ x, y }, this.game.getCell({ x, y }));
    })
  }

  /**
   * @param {Point} param0
   * @returns HTMLElement
   */
  getCell({ x, y }) {
    return document.getElementById(cellId(x, y));
  }


}