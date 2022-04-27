import { Container, Table } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GCODE_SETTINGS_COLS } from '../../constants/Constants'
import { GCodeSettings } from '../../interfaces/gcode/GCodeSettings'
import { updateGCodeSettings } from '../../state/actions'
import { RootState } from '../../state/store'

const GCodeSettingsTable = () => {
  const gCodeSettings = useSelector<RootState, GCodeSettings>(
    (state: RootState) => state.smtAppReducer.gCodeSettings
  )
  const dispatch = useDispatch()

  return (
    <Container>
      <h5 className='text-center'>Settaggi GCODE</h5>
      <Table bordered striped>
        <thead>
          <tr>
            {GCODE_SETTINGS_COLS.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <NumberFormat
                onValueChange={({ value }) =>
                  updateGCodeSettings(dispatch, {
                    ...gCodeSettings,
                    feedRateZ: Number(value).valueOf(),
                  })
                }
                value={gCodeSettings.feedRateZ}
                thousandSeparator={false}
                inputMode='numeric'
                decimalScale={0}
                allowNegative={false}
                allowLeadingZeros={false}
              />
            </td>
            <td>
              <NumberFormat
                onValueChange={({ value }) =>
                  updateGCodeSettings(dispatch, {
                    ...gCodeSettings,
                    feedRateZMovement: Number(value).valueOf(),
                  })
                }
                value={gCodeSettings.feedRateZMovement}
                thousandSeparator={false}
                inputMode='numeric'
                decimalScale={0}
                allowNegative={false}
                allowLeadingZeros={false}
              />
            </td>
            <td>
              <NumberFormat
                onValueChange={({ value }) =>
                  updateGCodeSettings(dispatch, {
                    ...gCodeSettings,
                    clearenceZ: Number(value).valueOf(),
                  })
                }
                value={gCodeSettings.clearenceZ}
                thousandSeparator={false}
                inputMode='numeric'
                decimalSeparator='.'
                allowNegative={false}
                allowLeadingZeros={false}
              />
            </td>
            <td>
              <NumberFormat
                onValueChange={({ value }) =>
                  updateGCodeSettings(dispatch, {
                    ...gCodeSettings,
                    waitSecondsPick: Number(value).valueOf(),
                  })
                }
                value={gCodeSettings.waitSecondsPick}
                thousandSeparator={false}
                inputMode='numeric'
                decimalScale={0}
                allowNegative={false}
                allowLeadingZeros={false}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default GCodeSettingsTable
