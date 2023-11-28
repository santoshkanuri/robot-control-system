/* Direction */
export type Direction = 'N' | 'E' | 'S' | 'W';
/* Position Interface */
export interface Position {
  x: number,
  y: number,
  direction: Direction
}

export type Axis = 'x' | 'y';