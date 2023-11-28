import { Direction } from './types';

export const DIRECTIONS: Array<Direction> = ['N', 'E', 'S', 'W'];

export const MAX_GRID_SIZE = 100;

export const DEFAULT_INSTRUCTIONS_FILE = 'instructions.txt';

export const MOVES: Record<Direction, [number, number]> = {
	N: [0, 1],
	E: [1, 0],
	S: [0, -1],
	W: [-1, 0],
};