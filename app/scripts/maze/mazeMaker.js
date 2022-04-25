import { Materials, MAZE_HEIGHT, MAZE_WIDTH } from '../config/constants.js';
import { isNode, neighbors, randomInt } from '../tools/index.js';
import { Maze } from './maze.js';

export class MazeMaker {

  /** @type {Maze} */
  maze;

  /** @type {Point[]} */
  dirt = [];

  /** @param {Maze} maze */
  static create(maze) {
    new MazeMaker(maze);
  }

  /** @param {Maze} maze */
  constructor(maze) {
    this.maze = maze;
    const start = {
      x: randomInt(MAZE_WIDTH / 2) * 2 + 1,
      y: randomInt(MAZE_HEIGHT / 2) * 2 + 1,
    }
    this.dirt = [start];


    while (this.dirt.length) {
      const dirtIndex = randomInt(this.dirt.length);
      const [current] = this.dirt.splice(dirtIndex, 1);
      this.processCell(current);
    }
  }

  /** @param {Point} position */
  processNeighbor(position) {
    const { x, y } = position;
    const current = this.maze.getCell(position);

    if (current !== Materials.dirt) {
      return;
    }

    const touchedIndex = this.dirt.findIndex(dirt => dirt.x === x && dirt.y === y);
    if (touchedIndex > -1) {
      const [toStone] = this.dirt.splice(touchedIndex, 1);
      this.maze.setCell(toStone, Materials.stone);
      return;
    }
    this.dirt.push(position);
  }

  /**
   * @param {Point} position
   */
  processCell(position) {
    let current = position;
    this.maze.setCell(current, Materials.grass);
    if (!isNode(position)) {
      const temp = this.maze.findNeighbor(position, Materials.dirt);
      if (temp) {
        current = temp;
      }
      this.maze.setCell(current, Materials.grass);
    }

    for (let neighbor of neighbors(current)) {
      this.processNeighbor(neighbor);
    };
  }

}