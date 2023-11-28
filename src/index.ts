import NavigateController from './controllers/navigateController';
import { DEFAULT_INSTRUCTIONS_FILE } from './utils/constants';

const instructions: string = process.argv[2] ?? DEFAULT_INSTRUCTIONS_FILE;
const robotController = new NavigateController(instructions);
robotController.executeRobotCommands();