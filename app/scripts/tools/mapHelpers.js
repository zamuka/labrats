/**
 *
 * @param {Point} position
 * @returns boolean
 */
export function isNode(position) {
  return position.x % 2 === position.y % 2;
}