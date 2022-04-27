import { Dispatch } from "redux"
import { GCodeSettings } from "../../interfaces/gcode/GCodeSettings"
import { Rail } from "../../interfaces/Rail"
import { SmtComponent } from "../../interfaces/SmtComponent"

export enum ActionTypes {
 SET_COMPONENTS = 'set-components',
 SET_RAIL = "set-rail",
 UPDATE_RAIL_SETTING = 'update-rail-setting',
 UPDATE_GCODE_SETTINGS = 'update-gcode-settings',
 ADD_RAIL = 'add-rail',
 REMOVE_RAIL = 'remove-rail',
 SET_RAILS = 'set-rails'
}

interface SetComponentsAction {
 type: ActionTypes.SET_COMPONENTS
 payload: { items: SmtComponent[] }
}

interface SetRailAction {
 type: ActionTypes.SET_RAIL
 payload: {
  railId: number
  idComponent: string
 }
}

interface SetRailsAction {
 type: ActionTypes.SET_RAILS
 payload: {
  rails: Rail[]
 }
}

interface AddRailAction {
 type: ActionTypes.ADD_RAIL
}

interface RemoveRailAction {
 type: ActionTypes.REMOVE_RAIL,
 payload: { idRail: number }
}

interface UpdateRailSettingAction {
 type: ActionTypes.UPDATE_RAIL_SETTING
 payload: {
  value: Rail
  idRail: number
 }
}

interface UpdateGCodeSettingsAction {
 type: ActionTypes.UPDATE_GCODE_SETTINGS
 payload: {
  value: GCodeSettings
 }
}

export const setRail = (dispatch: Dispatch, idComponent: string, railId: number) => {
 dispatch({
  type: ActionTypes.SET_RAIL,
  payload: { idComponent, railId }
 })
}

export const setComponents = (dispatch: Dispatch, items: SmtComponent[], projectName: string) => {
 dispatch({
  type: ActionTypes.SET_COMPONENTS,
  payload: { items, projectName }
 })
}

export const updateRailSetting = (dispatch: Dispatch, rail: Rail) => {
 dispatch({
  type: ActionTypes.UPDATE_RAIL_SETTING,
  payload: { rail }
 })
}

export const updateGCodeSettings = (dispatch: Dispatch, gCodeSettings: GCodeSettings) => {
 dispatch({
  type: ActionTypes.UPDATE_GCODE_SETTINGS,
  payload: { gCodeSettings }
 })
}

export const addRail = (dispatch: Dispatch) => {
 dispatch({ type: ActionTypes.ADD_RAIL })
}

export const setRails = (dispatch: Dispatch, rails: Rail[]) => {
 dispatch({ type: ActionTypes.SET_RAILS, payload: { rails } })
}

export const removeRail = (dispatch: Dispatch, idRail: number) => {
 dispatch({ type: ActionTypes.REMOVE_RAIL, payload: { idRail } })
}

export type Action = SetComponentsAction | SetRailAction | UpdateRailSettingAction | UpdateGCodeSettingsAction | AddRailAction | RemoveRailAction | SetRailsAction