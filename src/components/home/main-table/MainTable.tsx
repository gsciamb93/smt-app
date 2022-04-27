import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { MAIN_TABLE_COLS } from '../../../constants/Constants'
import { SmtComponent } from '../../../interfaces/SmtComponent'
import { RootState } from '../../../state/store'

import SmtComponentRow from './SmtComponentRow'

const MainTable = () => {
  const tableData = useSelector<RootState, SmtComponent[]>(
    (state: RootState) => state.smtAppReducer.items
  )

  return (
    <Table bordered striped>
      <thead>
        <tr className='align-middle text-center'>
          {MAIN_TABLE_COLS.map((rows, index) => {
            return <th key={index}>{rows}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {
          //Colonne dei componenti
          tableData?.map((row, index) => {
            return <SmtComponentRow key={index} data={row} />
          })
        }
      </tbody>
    </Table>
  )
}

export default MainTable
