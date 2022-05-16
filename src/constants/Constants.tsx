export const enum FILE_FORMATS {
  ISO = '.iso',
  CSV = '.csv',
  JSON = '.json',
}

export const enum DATA_TYPES {
  JSON = 'data:text/json',
  TEXT = 'data:text/plain',
}

export const enum UNITS {
  MILLIMITERS,
  INCHES,
}

export const enum PATHS {
  HOME = '/smt-app',
  SETTINGS = '/smt-app/settings',
}

export const degreesToNumber = (degrees: number) => {
  switch (degrees) {
    case 90:
      return 1
    case 180:
      return 2
    case 270:
      return 3
    case 360:
      return 4
    default:
      return 0
  }
}

export const GCODE_SETTINGS_COLS: string[] = [
  "Velocità F dell'asse Z",
  'Velocità F di Z spostamento',
  'Z Spostamento(mm)',
  'Attesa presa del componente(secondi)',
]

export const CSV_VALID_COLS: string[] = [
  'Part ID',
  'Value',
  'Package',  
  'Rotation',
  'X',
  'Y',
]

export const MAIN_TABLE_COLS: string[] = [...CSV_VALID_COLS, 'Binario']

export const RAIL_SETTINGS_COLS: string[] = [
  'ID',
  'X(mm)',
  'Y(mm)',
  'Z(mm)',
  'SCORRIMENTO Z(mm)',
  'SCORRIMENTO Y(mm)',
  'ROTAZIONE(°)',
  '',
]
