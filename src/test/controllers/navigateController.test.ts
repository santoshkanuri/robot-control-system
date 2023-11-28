import { expect, use as UseChai } from 'chai';
import  * as sinon from 'sinon';
import * as sinonChai  from 'sinon-chai';
import NavigateController from '../../controllers/navigateController';
import RobotControlSystem from '../../controllers/robotControlSystem';
UseChai(sinonChai);
const sandbox = sinon.createSandbox();
describe('NavigateController', () => {

	context('executeRobotCommands', () => {
		let consoleLogStub, navigateController, getRobotInstructionsStub, consoleErrorStub;
		beforeEach(()=>{
			consoleLogStub = sandbox.stub(console, 'log');
			navigateController = new NavigateController('test_instructions.txt');
			getRobotInstructionsStub = sandbox.stub(navigateController, 'getRobotInstructions');
			consoleErrorStub = sandbox.stub(console, 'error');
		});
		afterEach(()=>{
			sandbox.restore();
		});
		it('should execute robot commands and print starting and final positions', () => {
			getRobotInstructionsStub.returns(['N 0 0', 'MRMLMRM1']);
			const robotControlSystemStub = sandbox.createStubInstance(RobotControlSystem);
			robotControlSystemStub.getPosition.returns({ direction: 'N', x: 0, y: 0 });
			robotControlSystemStub.executeCommands.returns({ direction: 'W', x: 0, y: 0});
			sandbox.replace(RobotControlSystem.prototype, 'getPosition', robotControlSystemStub.getPosition);
			sandbox.replace(RobotControlSystem.prototype, 'executeCommands', robotControlSystemStub.executeCommands);
			navigateController.executeRobotCommands();
			expect(consoleLogStub).to.be.have.calledTwice;
			expect(consoleLogStub).to.have.been.calledWith('Starting Position : N 0 0');
			expect(consoleLogStub).to.have.been.calledWith('Final Position : W 0 0');
		});

		it('should handle errors during execution of robot commands', () => {
			getRobotInstructionsStub.throws(new Error('Invalid instructions format'));
			navigateController.executeRobotCommands();
			expect(consoleErrorStub).to.have.been.calledWith('Error: Invalid instructions format');
		});
	});
	context('printPosition', ()=>{
		let consoleLogStub, navigateController;
		beforeEach(()=>{
			navigateController = new NavigateController('test_instructions.txt');
			consoleLogStub = sandbox.stub(console,'log');
		});
		afterEach(()=>{
			sandbox.restore();
		});
		it('should print position message', ()=>{
			navigateController['printPosition']('test', {x:0, y:0,direction:'N'});
			expect(consoleLogStub).to.be.have.calledOnceWith('test : N 0 0');
		});
		it('should throw Error when missing params', ()=>{
			try{
				navigateController['printPosition']('test');
				expect(navigateController['printPosition']('test')).to.be.have.throw;
				expect(consoleLogStub).to.be.have.not.called;
			} catch(error){
				expect(error).to.be.instanceOf(Error);
				expect(error.toString()).to.be.equals('Error: Position required');
			}
			
		});
	});
});
