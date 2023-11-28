import { Direction, Position, Axis } from '../utils/types';
import { MAX_GRID_SIZE, DIRECTIONS, MOVES } from '../utils/constants';

export default class RobotControlSystem {
	private readonly position: Position;
	clockWiseDirections = DIRECTIONS;
	antiClockWiseDirections: Array<Direction>;
	constructor(initialPosition: string) {
		const [direction, x, y]: Array<string> = initialPosition.split(' ');
		
		if (!this.isValidPosition(x, y, direction as Direction)) {
			throw new Error('Invalid initial position');
		}
		this.position = {
			x: parseInt(x),
			y: parseInt(y),
			direction: direction as Direction,
		};
		this.clockWiseDirections = this.getClockwiseDirections('N'); //this.position.direction
	}

	private isValidPosition(x: string, y: string, direction: Direction): boolean {
		const parsedX = parseInt(x);
		const parsedY = parseInt(y);

		return (
			!isNaN(parsedX) &&
      !isNaN(parsedY) &&
      parsedX >= 0 &&
      parsedX < MAX_GRID_SIZE &&
      parsedY >= 0 &&
      parsedY < MAX_GRID_SIZE &&
      DIRECTIONS.includes(direction)
		);
	}

	private move(axis: Axis, increment: number): void {
		const currentValue = this.position[axis];
		this.position[axis] = (currentValue + increment + MAX_GRID_SIZE) % MAX_GRID_SIZE;
	}

	private rotate(isClockwise: boolean): void {
		const directions: Direction[] =  DIRECTIONS;
		const increment = isClockwise ? 1 : 3;
		const currentDirectionIndex = directions.indexOf(this.position.direction);
		this.position.direction = directions[(currentDirectionIndex + increment) % 4];
	}

	executeCommands(commands: string): Position {
		const commandArr:Array<string> = commands.match(/[A-Z]\d*/g) || [];
		for (const command of commandArr) {
			const action = command.charAt(0);
			const repetitions = parseInt(command.substring(1)) || 1;
			for (let i = 0; i < repetitions; i++) {
				switch (action) {
				case 'M':
					this.moveForward();
					break;
				case 'L':
					this.rotate(false);
					break;
				case 'R':
					this.rotate(true);
					break;
				default:
					/* istanbul ignore next */
					break;
				}
			}
		}
		return this.position;
	}

	private moveForward(): void {
		const [dx, dy] = MOVES[this.position.direction];
		this.move('x', dx);
		this.move('y', dy);
	}

	public getPosition(): Position {
		return this.position;
	}

	//TODO: can we need to get Directions from initial position for grid initialization? 
	private getClockwiseDirections(startingDirection: Direction): Direction[] {
		const startIndex = DIRECTIONS.indexOf(startingDirection);
		const directions:Array<Direction> = [...DIRECTIONS];
		return [...directions.slice(startIndex), ...directions.slice(0, startIndex)];
	}

}
