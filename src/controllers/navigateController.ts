import { readFileSync } from 'node:fs';
import { resolve as PathResolve } from 'node:path';
import RobotControlSystem from './robotControlSystem';
import { Position } from '../utils/types';
import { DEFAULT_INSTRUCTIONS_FILE } from '../utils/constants';

export default class NavigateController {
	private readonly fileName: string;

	constructor(fileName: string = DEFAULT_INSTRUCTIONS_FILE) {
		this.fileName = fileName;
	}

	/* istanbul ignore next */
	private getRobotInstructions(filePath: string): [string, string] {
		const instructions = readFileSync(PathResolve(filePath), 'utf-8')
			.trim()
			.split('\n')
			.splice(0, 2);

		if (instructions.length !== 2) {
			throw new Error('Invalid instructions format');
		}

		return instructions as [string, string];
	}

	private printPosition(label: string, position: Position): void {
		if(!position){
			throw new Error('Position required');
		}
		console.log(`${label} : ${position.direction} ${position.x} ${position.y}`);
	}
	
	public executeRobotCommands(): void {
		try {
			const [initialPosition, commands] = this.getRobotInstructions(PathResolve(process.cwd(), this.fileName));
			const robot = new RobotControlSystem(initialPosition);

			this.printPosition('Starting Position', robot.getPosition());
			this.printPosition('Final Position', robot.executeCommands(commands));
		} catch (error) {
			console.error((error instanceof Error) ? error.toString() : 'An unexpected error occurred.');
		}
	}
}


