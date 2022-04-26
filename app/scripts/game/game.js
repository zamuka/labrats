import { Materials } from '../config/constants.js';
import { Maze } from '../maze/maze.js';
import { randomInt } from '../tools/random.js';


const withPosition = pos => obj => (pos.x === obj.position.x && pos.y === obj.position.y);
export class Game {

  /** @type {Maze} */
  maze;

  /** @type {Point} */
  playerPosition;

  /** @type {GameObject[]} */
  objects = [];

  /** @param {Maze} maze */
  constructor(maze) {
    this.maze = maze;
    this.playerPosition = maze.getRandom(Materials.grass);
  }

  /**
   *
   * @param {number} dx
   * @param {number} dy
   * @returns
   */
  move(dx, dy) {
    const newPosition = {
      x: this.playerPosition.x + dx,
      y: this.playerPosition.y + dy,
    }
    if (this.maze.getCell(newPosition) === Materials.stone) {
      return false;
    }
    const result = this.maze.getCell(this.playerPosition);
    this.maze.setCell(this.playerPosition, Materials.grass);
    this.playerPosition = newPosition;
    this.maze.setCell(this.playerPosition, Materials.player);
    this.maze.unfog(this.playerPosition);

    const obj = this.objects.find(withPosition(newPosition));
    if (obj?.objectType === 'candy') {
      this.objects = this.objects.filter(o => o !== obj);
    }

    return result;
  }

  /**
   * @param {number} count
   */
  addCandies(count) {
    for (let i = 0; i < count; i = i + 1) {
      const position = this.maze.getRandom(Materials.grass);
      this.objects.push({
        position,
        objectType: 'candy',
        details: String(randomInt(10) + 1),
      });
    }
  }

  /**
   *
   * @param {Point} position
   */
  getCell(position) {
    const cellMaterial = this.maze.getFoggedCell(position);
    const item = this.objects.find(obj =>
      obj.position.x === position.x &&
      obj.position.y === position.y);
    if (item?.objectType === 'candy') {
      if (cellMaterial === Materials.fog) {
        return Materials.question;
      }
      if (cellMaterial === Materials.grass) {
        return Materials.candy + ` type-${item.details}`;
      }
    }
    return cellMaterial;
  }

  get width() {
    return this.maze.width;
  }
  get height() {
    return this.maze.height;
  }
}