import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import RobotControlSystem from './robot_control_system'
import { type Position } from './types'

const main = (): void => {
  try {
    const instructions = readFileSync(join(__dirname, '../instructions.txt'), 'utf-8')
    const [initialPosition, commands] = instructions.trim().split('\n')
    const [direction, x, y] = initialPosition.split(' ')
    // validating initial Position
    if (!['N', 'E', 'S', 'W'].includes(direction) || (parseInt(x).toString() === 'NaN') || (parseInt(y).toString() === 'NaN')) {
      throw new Error('Invalid Initial Position')
    }
    const robot = new RobotControlSystem(initialPosition)
    const startingPosition: Position = robot.getPosition()
    console.log(`Staring Position : ${startingPosition.direction} ${startingPosition.x} ${startingPosition.y}`)
    const position: Position = robot.executeCommands(commands)
    console.log(`Final Position : ${position.direction} ${position.x} ${position.y}`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString())
    }
  }
}

main()
