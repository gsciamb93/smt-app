import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { Rail } from '../../../interfaces/Rail'
import { setRail } from '../../../state/actions'
import { useEffect } from 'react'

interface RailSelectProps {
  idComponent: string
  selectedIdRail?: number
}

const RailSelect = ({ idComponent, selectedIdRail }: RailSelectProps) => {
  const options: string[] = []
  const dispatch = useDispatch()

  const rails = useSelector<RootState, Rail[]>(
    (state: RootState) => state.smtAppReducer.rails
  )

  options.push('Non assegnato', ...rails.map(({ id }) => id + ''))

  const onChangeHandler = (idRail: number) => {
    setRail(dispatch, idComponent, idRail)
  }

  return (
    <select
      defaultValue={selectedIdRail?.toString()}
      onChange={(e) => onChangeHandler(Number(e.target.value))}
    >
      {options.map((val, i) => {
        return (
          <option key={i} value={val}>
            {val}
          </option>
        )
      })}
    </select>
  )
}

export default RailSelect
