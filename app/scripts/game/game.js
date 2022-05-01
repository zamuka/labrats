import { Materials } from '../config/constants.js';
import { Maze } from '../maze/maze.js';
import { randomInt } from '../tools/random.js';
import { play } from '../services/sound-service.js';

/**
 *
 * @param {Point} pos
 * @returns (Point) => boolean
 */
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

    this.playerPosition = newPosition;

    this.maze.unfog(this.playerPosition);

    this.processObjects();

    return true;
  }

  get activeObjects() {
    return this.objects
      .filter(Boolean)
      .filter(obj => !obj.deactivated);
  }
  processObjects() {
    const touchedObjects = this.activeObjects.filter(withPosition(this.playerPosition));
    touchedObjects.forEach(obj => this.touchObject(obj));
  }

  /**
   *
   * @param {GameObject} obj
   */
  touchObject(obj) {
    if (obj.objectType === 'candy') {
      play('chew');
      obj.deactivated = true;
    }
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
    const item = this.activeObjects.find(obj =>
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