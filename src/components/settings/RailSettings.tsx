import { Button, Container, Table } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RAIL_SETTINGS_COLS } from '../../constants/Constants'
import { Rail } from '../../interfaces/Rail'
import { addRail, removeRail, updateRailSetting } from '../../state/actions'
import { RootState } from '../../state/store'

const RailSettings = () => {
  const dispatch = useDispatch()
  const rails = useSelector<RootState, Rail[]>(
    (state: RootState) => state.smtAppReducer.rails
  )

  return (
    <Container className='mt-4'>
      <Container className='mb-4'>
        <h5 className='text-center d-inline'>Settaggi Binari</h5>
        <Button
          variant='success'
          className='float-end'
          onClick={() => addRail(dispatch)}
        >
          + Aggiungi Binario
        </Button>
      </Container>
      <Table striped bordered className='align-middle text-center'>
        <thead>
          <tr>
            {RAIL_SETTINGS_COLS.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rails.map((rail, i) => (
            <tr key={i}>
              <td>{rail.id + ''}</td>
              <td>
                <NumberFormat
                  onValueChange={({ value }) =>
                    updateRailSetting(dispatch, {
                      ...rail,
                      x: Number(value).valueOf(),
                    })
                  }
                  value={rail.x}
                  thousandSeparator={false}
                  inputMode='numeric'
                  decimalSeparator='.'
                  allowNegative={true}
                  allowLeadingZeros={false}
                />
              </td>
              <td>
                <NumberFormat
                  onValueChange={({ value }) =>
                    updateRailSetting(dispatch, {
                      ...rail,
                      y: Number(value).valueOf(),
                    })
                  }
                  value={rail.y}
                  thousandSeparator={false}
                  inputMode='numeric'
                  decimalSeparator='.'
                  allowNegative={true}
                  allowLeadingZeros={false}
                />
              </td>
              <td>
                <NumberFormat
                  onValueChange={({ value }) =>
                    updateRailSetting(dispatch, {
                      ...rail,
                      z: Number(value).valueOf(),
                    })
                  }
                  value={rail.z}
                  thousandSeparator={false}
                  inputMode='numeric'
                  decimalSeparator='.'
                  allowNegative={true}
                  allowLeadingZeros={false}
                />
              </td>
              <td>
                <NumberFormat
                  onValueChange={({ value }) =>
                    updateRailSetting(dispatch, {
                      ...rail,
                      scrollZ: Number(value).valueOf(),
                    })
                  }
                  value={rail.scrollZ}
                  thousandSeparator={false}
                  inputMode='numeric'
                  decimalSeparator='.'
                  allowNegative={true}
                  allowLeadingZeros={false}
                />
              </td>
              <td>
                <NumberFormat
                  onValueChange={({ value }) =>
                    updateRailSetting(dispatch, {
                      ...rail,
                      scrollY: Number(value).valueOf(),
                    })
                  }
                  value={rail.scrollY}
                  thousandSeparator={false}
                  inputMode='numeric'
                  decimalSeparator='.'
                  allowNegative={true}
                  allowLeadingZeros={false}
                />
              </td>
              <td>
                <NumberFormat
                  onValueChange={({ value }) =>
                    updateRailSetting(dispatch, {
                      ...rail,
                      rotation: Number(value).valueOf(),
                    })
                  }
                  value={rail.rotation}
                  thousandSeparator={false}
                  inputMode='numeric'
                  allowNegative={true}
                  decimalScale={0}
                  allowLeadingZeros={false}
                />
              </td>
              <td>
                <Button
                  onClick={() => removeRail(dispatch, rail.id)}
                  variant='danger'
                >
                  X Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default RailSettings
