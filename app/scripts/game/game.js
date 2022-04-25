import { Materials } from '../config/constants.js';
import { Maze } from '../maze/maze.js';

export class Game {

  /** @type {Maze} */
  maze;

  /** @type {Point} */
  playerPosition;

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

    return result;
  }
}