import { UNITS } from '../../constants/Constants'

export interface GCodeSettings {
  feedRateZ: number
  units: UNITS
  clearenceZ: number
  waitSecondsPick: number
  feedRateZMovement: number
}
