import { Materials, SIGHT_RANGE } from '../config/constants.js';
import { directions, neighbors } from '../tools/iterators.js';
import { randomInt } from '../tools/random.js';

export class Maze {
  /**
   * @type number;
   */
  width;

  /**
   * @type number;
   */
  height;

  /**
   * @type {MazeCell[]};
   */
  cells = [];
  /**
   *
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    this.setInitialState();
  }

  setInitialState() {
    this.forEachCell((x, y) => {
      if (!x || !y ||
        x === this.width - 1 || y === this.height - 1 ||
        !(x % 2 || y % 2)) {
        this.setCell({ x, y }, Materials.stone);
        return;
      }
      this.setCell({ x, y }, Materials.dirt);
    });
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

  /**
   *
   * @param {*} material
   * @param {Point} position
   */
  setCell(position, material) {
    const cellIndex = position.x + position.y * this.width;
    this.cells[cellIndex] = Object.assign({}, this.cells[cellIndex], { material });
  }

  /**
   * @param {Point} position
   * @returns string
   */
  getCell({ x, y }) {
    return (this.cells[x + y * this.width]).material;
  }

  /**
   *
   * @param {Point} position
   */
  unfogCell({ x, y }) {
    const cellIndex = x + y * this.width;
    this.cells[cellIndex] = Object.assign({}, this.cells[cellIndex], { seen: true });
  }

  /**
   *
   * @param {Point} position
   * @returns
   */
  getFoggedCell({ x, y }) {
    const cell = this.cells[x + y * this.width];
    if (!cell.seen && cell.material === Materials.candy) {
      return Materials.question;
    }
    return cell.seen ? cell.material : Materials.fog;
  }

  /**
   * @param {Point} position
   */
  isTransparent(position) {
    const opaqueMaterials = [Materials.stone];
    return !opaqueMaterials.includes(this.getCell(position));
  }
  /**
   * @param {Point} position
   */
  unfog(position) {
    this.unfogCell(position);
    for (let [directionName, direction] of Object.entries(directions)) {
      let distance = 1;
      let x = -1;
      let y = -1;
      do {
        x = position.x + Math.trunc(direction.dx * distance);
        y = position.y + Math.trunc(direction.dy * distance);
        this.unfogCell({ x, y });
        distance = distance + 1
      } while (distance < SIGHT_RANGE && this.isTransparent({ x, y }));
    }
  }

  /**
   *
   * @param  {...any} materials
   * @returns Point
   */
  getRandom(...materials) {
    let iteration = 100; // max iterations
    const position = {
      x: -1,
      y: -1,
    };
    do {
      position.x = randomInt(this.width);
      position.y = randomInt(this.height);
      iteration = iteration - 1;
      if (!iteration) {
        return { x: -1, y: -1 };
      }

    } while (!materials.includes(this.getCell(position)));

    return position;
  }

  /**
   * @param {Point} position
   * @param {string} material
   * @returns Point
   */
  findNeighbor(position, material) {
    for (let neighbor of neighbors(position)) {
      if (this.getCell(neighbor) === material) {
        return neighbor;
      }
    }
    return null;
  }
}