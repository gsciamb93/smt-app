import { AnyAction } from "redux"
import { UNITS } from "../../constants/Constants"
import { GCodeSettings } from "../../interfaces/gcode/GCodeSettings"
import { Rail } from "../../interfaces/Rail"
import { SmtComponent } from "../../interfaces/SmtComponent"
import { ActionTypes } from "../actions"

export type SmtAppState = {
  items: SmtComponent[],
  rails: Rail[],
  gCodeSettings: GCodeSettings,
  projectName: string
}

const INIT_STATE: SmtAppState = {
  items: [],
  rails: [
    {
      id: 1,
      x: -45.0,
      y: -39.0,
      z: 0,
      scrollZ: -1,
      scrollY: 4,
      rotation: 0,
    },
  ]
  ,
  gCodeSettings: {
    units: UNITS.MILLIMITERS,
    clearenceZ: 5,
    feedRateZMovement: 500,
    feedRateZ: 200, //Velocità di presa e spostamento binario
    waitSecondsPick: 1, //Attesa presa del componente
  },
  projectName: ''
}

export const RAIL_DEFAULT_VALUES: Rail = {
  id: 0,
  x: 0,
  y: 0,
  z: 0,
  scrollY: 4,
  scrollZ: -1,
  rotation: 0
}

const smtAppReducer = (state = INIT_STATE, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SET_COMPONENTS:
      console.log(ActionTypes.SET_COMPONENTS, action.payload);
      return { ...state, items: [...action.payload.items] };

    case ActionTypes.SET_RAIL:
      console.log(ActionTypes.SET_RAIL, action.payload);
      const itemsUpdated = state.items.map((item) =>
        item.id === action.payload.idComponent ? { ...item, railId: action.payload.railId } : item
      );
      return { ...state, items: itemsUpdated };

    case ActionTypes.UPDATE_RAIL_SETTING:
      console.log(ActionTypes.UPDATE_RAIL_SETTING, action.payload);
      const railsUpdated = state.rails.map((rail) =>
        rail.id === action.payload.rail.id ? { ...action.payload.rail } : rail
      );
      return { ...state, rails: railsUpdated };

    case ActionTypes.UPDATE_GCODE_SETTINGS:
      console.log(ActionTypes.UPDATE_GCODE_SETTINGS, action.payload);
      return { ...state, gCodeSettings: action.payload.gCodeSettings };

    case ActionTypes.ADD_RAIL:
      console.log(ActionTypes.ADD_RAIL, action.payload);
      const nextId: number = state.rails.length ? Math.max(...state.rails.map(({ id }) => id)) + 1 : 1;
      return { ...state, rails: [...state.rails, { ...RAIL_DEFAULT_VALUES, id: nextId }] }

    case ActionTypes.REMOVE_RAIL:
      console.log(ActionTypes.REMOVE_RAIL, action.payload);
      return {
        ...state, rails: [...state.rails.filter((rail) => rail.id !== action.payload.idRail)]
      }
    case ActionTypes.SET_RAILS:
      console.log(ActionTypes.SET_RAILS, action.payload);
      return {
        ...state, rails: [...action.payload.rails]
      }
    default: return state;
  }
}

export default smtAppReducer;