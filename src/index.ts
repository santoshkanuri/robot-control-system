import NavigateController from './navigateController';
import { DEFAULT_INSTRUCTIONS_FILE } from './constants';

const instructions: string = process.argv[2] ?? DEFAULT_INSTRUCTIONS_FILE;
const robotController = new NavigateController(instructions);
robotController.executeRobotCommands();