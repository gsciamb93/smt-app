import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { DATA_TYPES, degreesToNumber } from '../../../constants/Constants'
import {
  GCodeCommand,
  LinearInterpolationCommand,
  PositioningAbsoluteCommand,
  PositioningRelativeCommand,
  ProgramEndCommand,
  PumpOffCommand,
  PumpOnCommand,
  RapidMovementCommand,
  UnitsMillimetersCommand,
  ValveOffCommand,
  ValveOnCommand,
  WaitCommand,
} from '../../../interfaces/gcode/GCodeCommands'
import { GCodeSettings } from '../../../interfaces/gcode/GCodeSettings'
import { Rail } from '../../../interfaces/Rail'
import { SmtComponent } from '../../../interfaces/SmtComponent'
import { RootState } from '../../../state/store'
import FileDownloadButton from '../file/FileDownloadButton'

const GCodeViewer = () => {
  const [gCodeLines, setGCodeLines] = useState<string[]>([])

  const projectName = useSelector<RootState, string>(
    (state: RootState) => state.smtAppReducer.projectName
  )

  const components = useSelector<RootState, SmtComponent[]>(
    (state: RootState) => state.smtAppReducer.items
  )

  const rails = useSelector<RootState, Rail[]>(
    (state: RootState) => state.smtAppReducer.rails
  )

  const gCodeSettings = useSelector<RootState, GCodeSettings>(
    (state: RootState) => state.smtAppReducer.gCodeSettings
  )

  const updateGCode = () => {
    let gCodeLines: string[] = []

    //Parte iniziale del GCode'
    addCommandsToGCode(
      gCodeLines,
      RapidMovementCommand({ x: 0, y: 0, a: 0 }),
      PumpOnCommand
    )

    //Sezione di Pick and Place
    components.forEach((component) =>
      addGCodePickSequence(gCodeLines, component)
    )

    //Parte finale del GCode
    addCommandsToGCode(
      gCodeLines,
      PumpOffCommand,
      LinearInterpolationCommand(
        { z: gCodeSettings.clearenceZ },
        gCodeSettings.feedRateZMovement
      ),
      PositioningAbsoluteCommand,
      RapidMovementCommand({ x: 0, y: 0 }),
      ProgramEndCommand
    )

    setGCodeLines(gCodeLines)
  }

  const addCommandsToGCode = (
    gCodeLines: string[],
    ...commands: GCodeCommand[]
  ) => {
    commands.forEach((cmd) => gCodeLines.push(cmd.toString()))
  }

  const addGCodePickSequence = (
    gCodeLines: string[],
    component: SmtComponent
  ) => {
    if (component.railId != undefined) {
      const rail = rails.find(({ id }) => component.railId === id)
      if (rail) {
        const { clearenceZ, feedRateZ, feedRateZMovement, waitSecondsPick } =
          gCodeSettings

        addCommandsToGCode(
          gCodeLines,
          PositioningAbsoluteCommand,
          LinearInterpolationCommand({ z: clearenceZ }, feedRateZMovement),
          RapidMovementCommand({ x: rail.x, y: rail.y }),
          LinearInterpolationCommand({ z: rail.z }, feedRateZ),
          ValveOnCommand,
          WaitCommand(waitSecondsPick),
          LinearInterpolationCommand({ z: clearenceZ }, feedRateZMovement),
          LinearInterpolationCommand({
            a: degreesToNumber(component.rotation),
          }),
          RapidMovementCommand({
            x: component.x,
            y: component.y,
          }),
          LinearInterpolationCommand({ z: 0 }, feedRateZ),
          ValveOffCommand,
          WaitCommand(waitSecondsPick),
          LinearInterpolationCommand({ z: clearenceZ }, feedRateZMovement),
          LinearInterpolationCommand({ a: 0 }),
          RapidMovementCommand({
            x: rail.x,
            y: rail.y,
          }),
          LinearInterpolationCommand({ z: rail.scrollZ }, feedRateZ),
          PositioningRelativeCommand,
          LinearInterpolationCommand({ y: rail.scrollY })
        )
      }
    }
  }

  useEffect(updateGCode, [components, gCodeSettings])

  return (
    <Container className='bg-light p-4 h-100'>
      <Container>
        <Row>
          <Col>
            <h4>GCode</h4>
          </Col>
          <Col>
            <FileDownloadButton
              dataType={DATA_TYPES.TEXT}
              className='btn btn-success float-end'
              title='💾 Download GCode'
              dataToSave={gCodeLines.join('\n')}
              fileName={`GCode-${Date.now()}.iso`}
            />
          </Col>
        </Row>
      </Container>
      <Container className='mt-2 pt-4 border-top'>
        {gCodeLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </Container>
    </Container>
  )
}

export default GCodeViewer
