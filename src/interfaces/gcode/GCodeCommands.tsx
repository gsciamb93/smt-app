import { GCodeCoordinates } from './GCodeCoordinates'

export type GCodeCommand = {
  readonly cmd: String
  value?: number
  nestedCommand?: GCodeCommand
  coordinates?: GCodeCoordinates
  toString: Function
}

export const GCodeCommandFactory = (
  cmd: String,
  value?: number,
  nestedCommand?: GCodeCommand,
  coordinates?: GCodeCoordinates,
  feedrate?: number
) => {
  const x = coordinates?.x
  const y = coordinates?.y
  const z = coordinates?.z
  const a = coordinates?.a

  return {
    cmd,
    value,
    coordinates,
    nestedCommand,
    toString: () =>
      cmd +
      (value != undefined ? value.toString() : '') +
      ' ' +
      ((x != undefined ? 'X' + x : '') +
        (y != undefined ? ' Y' + y : '') +
        (z != undefined ? ' Z' + z : '') +
        (a != undefined ? ' A' + a : '')) +
      ' ' +
      (feedrate != undefined ? FeedRateCommand(feedrate).toString() : '') +
      ' ' +
      (nestedCommand ? nestedCommand?.toString() : ''),
  } as GCodeCommand
}

export const UnitsMillimetersCommand = GCodeCommandFactory('G', 21)
export const UnitsInchesCommand = GCodeCommandFactory('G', 20)
export const ProgramStopCommand = GCodeCommandFactory('M', 0)
// export const ProgramEndCommand = GCodeCommandFactory('M', 30)
export const ProgramEndCommand = GCodeCommandFactory('%')
export const SpindleOnClockwiseCommand = GCodeCommandFactory('M', 3)
export const SpindleOnCounterClockwiseCommand = GCodeCommandFactory('M', 4)
export const SpindleStopCommand = GCodeCommandFactory('M', 5)
export const ToolChangeCommand = GCodeCommandFactory('M', 6)
export const FloodColantOnCommand = GCodeCommandFactory('M', 8)
export const FloodColantOffCommand = GCodeCommandFactory('M', 9)
export const PositioningAbsoluteCommand = GCodeCommandFactory('G', 90)
export const PositioningRelativeCommand = GCodeCommandFactory('G', 91)
export const ReturnHomeCommand = GCodeCommandFactory('G', 28)

export const PumpOnCommand = GCodeCommandFactory('M', 803)
export const PumpOffCommand = GCodeCommandFactory('M', 903)

export const ValveOnCommand = GCodeCommandFactory('M', 801)
export const ValveOffCommand = GCodeCommandFactory('M', 901)

export const RapidMovementCommand = (coordinates: GCodeCoordinates) =>
  GCodeCommandFactory('G', 0, undefined, coordinates)

export const LinearInterpolationCommand = (
  coordinates: GCodeCoordinates,
  feedrate?: number
) => GCodeCommandFactory('G', 1, undefined, coordinates, feedrate)

export const FeedRateCommand = (value: number) =>
  GCodeCommandFactory('F', value)

export const WaitCommand = (value: number) =>
  GCodeCommandFactory('G', 4, GCodeCommandFactory('S', value))
