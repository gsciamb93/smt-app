import { Button, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DATA_TYPES, FILE_FORMATS, PATHS } from '../constants/Constants'
import { setRails, setComponents, updateGCodeSettings } from '../state/actions'
import { RootState } from '../state/store'
import CsvFileUploader from './home/csv/CsvFileUploader'
import FileDownloadButton from './home/file/FileDownloadButton'
import FileUploadButton from './home/file/FileUploadButton'
import GCodeViewer from './home/gcode/GCodeViewer'
import MainTable from './home/main-table/MainTable'

const Home = () => {
  const smtAppReducer = useSelector((state: RootState) => state.smtAppReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleFileProjectUpload = (files: FileList | null) => {
    if (files) {
      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        const { gCodeSettings, rails, items } = JSON.parse(
          fileReader.result as string
        )
        setRails(dispatch, rails)
        updateGCodeSettings(dispatch, gCodeSettings)
        setComponents(dispatch, items, '')
      }
      fileReader.readAsText(files[0])
    }
  }

  return (
    <Container>
      <Container className='d-flex mt-3 mb-3'>
        <CsvFileUploader
          fileFormat={FILE_FORMATS.CSV}
          className='btn btn-primary'
          title={'📁 Apri CSV'}
        />
        <FileUploadButton
          fileFormat={FILE_FORMATS.JSON}
          handleFileCallback={handleFileProjectUpload}
          className='btn btn-primary'
          title='📁 Apri Progetto'
        />
        <FileDownloadButton
          fileName={`Progetto-${Date.now()}.json`}
          dataType={DATA_TYPES.JSON}
          className='btn btn-success'
          title={'💾 Salva Progetto'}
          dataToSave={smtAppReducer}
        />
        <Button
          className='ml-auto'
          variant='secondary'
          onClick={() => navigate(PATHS.SETTINGS)}
        >
          ⚙️ Impostazioni
        </Button>
      </Container>
      <Container>
        <MainTable />
        <GCodeViewer />
      </Container>
    </Container>
  )
}

export default Home
