/**
 * @param {Point} param0
 * @yields Point
 */
export function *neighbors({ x, y }) {
  yield { x: x - 1, y };
  yield { x: x + 1, y };
  yield { x, y: y - 1 };
  yield { x, y: y + 1 };
}

export const directions = {
  n:   { dx: 0,    dy: -1   },
  nne: { dx: 0.5,  dy: -1   },
  ne:  { dx: 1,    dy: -1   },
  nee: { dx: 1,    dy: -0.5 },
  e:   { dx: 1,    dy: 0    },
  sse: { dx: 1,    dy: 0.5  },
  se:  { dx: 1,    dy: 1    },
  see: { dx: 0.5,  dy: 1    },
  s:   { dx: 0,    dy: 1    },
  ssw: { dx: -0.5, dy: 1    },
  sw:  { dx: -1,   dy: 1    },
  sww: { dx: -1,   dy: 0.5  },
  w:   { dx: -1,   dy: 0    },
  nww: { dx: -1,   dy: -0.5 },
  nw:  { dx: -1,   dy: -1   },
  nnw: { dx: -0.5, dy: -1   },
}