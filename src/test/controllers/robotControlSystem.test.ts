import { expect, use as UseChai } from 'chai';
import  * as sinon from 'sinon';
import * as sinonChai  from 'sinon-chai';
import RobotControlSystem from '../../controllers/robotControlSystem';
import { Direction, Position } from '../../utils/types';
UseChai(sinonChai);
const sandbox = sinon.createSandbox();

describe('RobotControlSystem', () => {
	context('isValidPosition', () => {
		let robotControl;
		beforeEach(()=>{
			robotControl = new RobotControlSystem('N 1 1');
		});
		afterEach(()=>{
			sandbox.restore();
		});
		it('should return true for a valid position', () => {
			const isValid = robotControl['isValidPosition']('1', '1', 'N');
			expect(isValid).to.equal(true);
		});

		it('should return false for an invalid position', () => {
			const isValid = robotControl['isValidPosition']('101', '1', 'N');
			expect(isValid).to.equal(false);
		});
		it('should throw error when in valid data is passed',()=>{
			try {
				robotControl = new RobotControlSystem('N11');
			} catch (error) {
				expect(error).to.be.an.instanceOf(Error);	
				expect(error.toString()).to.be.equal('Error: Invalid initial position');
			}
		});
			
	});

	context('executeCommands', () => {
		it('should return final position after executing commands', () => {
			const robotControl = new RobotControlSystem('N 0 0');
			const finalPosition: Position = robotControl.executeCommands('MML');
			const expectedPosition: Position = { direction: 'W', x: 0, y: 2 };
			expect(finalPosition).to.deep.equal(expectedPosition);
		});

		it('should return initial position when no commands are given', () => {
			const robotControl = new RobotControlSystem('N 0 0');
			const finalPosition: Position = robotControl.executeCommands('');
			const expectedPosition: Position = { direction: 'N', x: 0, y: 0 };
			expect(finalPosition).to.deep.equal(expectedPosition);
		});
		it('should return final position after executing commands', () => {
			const robotControl = new RobotControlSystem('N 0 0');
			const finalPosition: Position = robotControl.executeCommands('MMR');
			const expectedPosition: Position = { direction: 'E', x: 0, y: 2 };
			expect(finalPosition).to.deep.equal(expectedPosition);
		});
	});

	context('getClockwiseDirections', () => {
		it('should return clockwise directions starting from N', () => {
			const robotControl = new RobotControlSystem('N 0 0');
			const clockwiseDirections: Direction[] = robotControl['getClockwiseDirections']('N');
			const expectedDirections: Direction[] = ['N', 'E', 'S', 'W'];
			expect(clockwiseDirections).to.deep.equal(expectedDirections);
		});

		it('should return clockwise directions starting from E', () => {
			const robotControl = new RobotControlSystem('N 0 0');
			const clockwiseDirections: Direction[] = robotControl['getClockwiseDirections']('E');
			const expectedDirections: Direction[] = ['E', 'S', 'W', 'N'];
			expect(clockwiseDirections).to.deep.equal(expectedDirections);
		});
	});
	context('getPoSition', () => {
		it('should return Position', () => {
			const robotControl = new RobotControlSystem('N 0 0');
			const position: Position= robotControl['getPosition']();
			const expectedPosition: Position = { direction: 'N', x: 0, y: 0 };
			expect(position).to.deep.equal(expectedPosition);
		});
	});
	context('move', () => {
		it('should Move Position', () => {
			const robotControl = new RobotControlSystem('N 0 0');
			robotControl['move']('y', 4);
			const expectedPosition: Position = { direction: 'N', x: 0, y: 4 };
			expect(robotControl.getPosition()).to.deep.equal(expectedPosition);
		});
	});
	context('rotate', () => {
		let robotControl, isClockwise;
		beforeEach(()=>{
			robotControl = new RobotControlSystem('N 0 0');
			isClockwise = false;
		});
		afterEach(()=>{
			sandbox.restore();
		});
		it('should rotate left', () => {
			robotControl['rotate'](isClockwise);
			const expectedPosition: Position = { direction: 'W', x: 0, y: 0 };
			expect(robotControl.getPosition()).to.deep.equal(expectedPosition);
		});
		it('should rotate right', () => {
			isClockwise = true;
			robotControl['rotate'](isClockwise);
			const expectedPosition: Position = { direction: 'E', x: 0, y: 0 };
			expect(robotControl.getPosition()).to.deep.equal(expectedPosition);
		});
	});
	context('move forward', () => {
		it('should Move forward bt 1 position', () => {
			const robotControl = new RobotControlSystem('E 2 0');
			robotControl['moveForward']();
			const expectedPosition: Position = { direction: 'E', x: 3, y: 0 };
			expect(robotControl.getPosition()).to.deep.equal(expectedPosition);
		});
	});
});
