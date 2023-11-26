import { type Direction, type Position } from './types'

// setting to maximum grid size to 100
const MAX_GRID = 100

export default class RobotControlSystem {
  private readonly position: Position

  constructor (initialPosition: string) {
    const [direction, x, y] = initialPosition.split(' ')
    this.position = {
      x: parseInt(x),
      y: parseInt(y),
      direction: direction as Direction
    }
  }

  private moveForward (): void {
    switch (this.position.direction) {
      case 'N':
        this.position.y = (this.position.y + 1) % MAX_GRID
        break
      case 'E':
        this.position.x = (this.position.x + 1) % MAX_GRID
        break
      case 'S':
        this.position.y = (this.position.y === 0) ? MAX_GRID - 1 : (this.position.y - 1) % MAX_GRID
        break
      case 'W':
        this.position.x = (this.position.x === 0) ? MAX_GRID - 1 : (this.position.x - 1) % MAX_GRID
        break
    }
  }

  private rotateLeft (): void {
    // directions order based on left to North
    const directions: Direction[] = ['N', 'W', 'S', 'E']
    const currentDirectionIndex = directions.indexOf(this.position.direction)
    // -1 and adding +4 in order to avoid negative
    this.position.direction = directions[(currentDirectionIndex + 3) % 4]
  }

  private rotateRight (): void {
    // directions order based on right to North
    const directions: Direction[] = ['N', 'E', 'S', 'W']
    const currentDirectionIndex = directions.indexOf(this.position.direction)
    this.position.direction = directions[(currentDirectionIndex + 1) % 4]
  }

  executeCommands (commands: string): Position {
    const commandArr = commands.match(/[A-Z]\d*/g) ?? []
    commandArr.forEach(command => {
      const action = command.charAt(0)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const repetitions = parseInt(command.substring(1)) || 1
      for (let i = 0; i < repetitions; i++) {
        switch (action) {
          case 'M':
            this.moveForward()
            break
          case 'L':
            this.rotateLeft()
            break
          case 'R':
            this.rotateRight()
            break
          default:
            break
        }
      }
    })
    return this.position
  }

  getPosition (): Position {
    return this.position
  }
}
