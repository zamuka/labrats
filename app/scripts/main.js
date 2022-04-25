import { Materials, MAZE_HEIGHT, MAZE_WIDTH } from './config/constants.js';
import { Game } from './game/game.js';
import { Grid } from './maze/grid.js';
import { Maze } from './maze/maze.js';
import { MazeMaker } from './maze/mazeMaker.js';
import { randomInt } from './tools/random.js';

const maze = new Maze(MAZE_WIDTH, MAZE_HEIGHT);
const grid = new Grid('#maze', maze);

MazeMaker.create(maze);
const game = new Game(maze);

for (let i = 0; i < 10; i = i + 1) {
  const cellPosition = maze.getRandom(Materials.grass);
  const cell = grid.getCell(cellPosition);
  if (cell) {
    cell.dataset['type'] = String(randomInt(10) + 1);
  }
  maze.setCell(cellPosition, Materials.candy);

}


/**
 * @param {number} dx
 * @param {number} dy
 */
function move(dx, dy) {
  const result = game.move(dx, dy);
  grid.update();
  return result;
}

move(0, 0);
/**
 *
 * @param {KeyboardEvent} event
 * @returns void
 */
function keyHandler(event) {
  console.log('====', event.key);
  /**
   * @type {{[key: string]: { dx: number, dy: number}}}
   */
  const keyToDelta = {
    ArrowUp: { dx: 0, dy: -1 },
    ArrowRight: { dx: 1, dy: 0 },
    ArrowDown: { dx: 0, dy: 1 },
    ArrowLeft: { dx: -1, dy: 0 },
  };
  const delta = keyToDelta[event.key];
  if (delta) {
    move(delta.dx, delta.dy);
  }

}


let mouseX = 0;
let mouseY = 0;
let follow = false;


function handleMouseDown() {
  follow = true;
}

function handleMouseUp() {
  follow = false;
}
function handleMouseClick() {
  follow = !follow;
}

function moveToMouse() {
  if (!follow) {
    return;
  }
  const p = grid.getCell(game.playerPosition);
  if (!p) {
    return;
  }
  const rect = p.getBoundingClientRect();
  const currentY = rect.top + rect.height / 2;
  const currentX = rect.left + rect.width / 2;

  const dx = Math.round((mouseX - currentX) / rect.width);
  const dy = Math.round((mouseY - currentY) / rect.height);

  if (Math.abs(dx) > Math.abs(dy)) {
    const moved = move(Math.sign(dx), 0);
    if (!moved && dy) {
      move(0, Math.sign(dy))
    }
  } else {
    const moved = move(0, Math.sign(dy));
    if (!moved && dx) {
      move(Math.sign(dx), 0);
    }
  }
}

setInterval(moveToMouse, 200);



/**
 *
 * @param {MouseEvent} evt
 */
function storeMousePos(evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}

window.addEventListener('keydown', keyHandler);
// window.addEventListener('mousedown', handleMouseDown);
// window.addEventListener('mouseup', handleMouseUp);
// window.addEventListener('click', handleMouseClick);
// window.addEventListener('mousemove', storeMousePos);
