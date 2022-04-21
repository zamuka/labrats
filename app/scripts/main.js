import { Materials, MAZE_HEIGHT, MAZE_WIDTH } from "./config/constants.js";
import { Maze } from "./maze/maze.js";

const maze = new Maze(MAZE_WIDTH, MAZE_HEIGHT, '#maze');

for (let y = 0; y < MAZE_HEIGHT; y = y + 1) {
  for (let x = 0; x < MAZE_WIDTH; x = x + 1) {
    if (!x || !y ||
      x === maze.width - 1 || y === maze.height - 1 ||
      !(x % 2 || y % 2)) {
      maze.setCell(x, y, Materials.stone);
      continue;
    }

    maze.setCell(x, y, 'dirt');
  }
}