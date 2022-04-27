import { SmtComponent } from '../../../interfaces/SmtComponent'
import RailSelect from './RailSelect'

interface SmtComponentRowProps {
  data: SmtComponent
}

const SmtComponentRow = ({ data }: SmtComponentRowProps) => {
  return (
    <tr className='align-middle text-center'>
      <td>{data.id}</td>
      <td>{data.value}</td>
      <td>{data.package}</td>
      <td>{data.stockCode}</td>
      <td>{data.layer}</td>
      <td>{data.rotation}</td>
      <td>{data.x}</td>
      <td>{data.y}</td>
      <td>
        <RailSelect idComponent={data.id} selectedIdRail={data.railId} />
      </td>
    </tr>
  )
}

export default SmtComponentRow
