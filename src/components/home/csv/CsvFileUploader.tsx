import Papa from 'papaparse'
import { SmtComponent } from '../../../interfaces/SmtComponent'
import { CSV_VALID_COLS } from '../../../constants/Constants'
import { useDispatch } from 'react-redux'
import { setComponents } from '../../../state/actions'
import FileUploadButton from '../file/FileUploadButton'

interface CsvFileUploaderProps {
  className: string
  title: string
  fileFormat: string
}

const CsvFileUploader = ({
  className,
  title,
  fileFormat,
}: CsvFileUploaderProps) => {
  const dispatch = useDispatch()

  const fileHandler = (files: FileList | null) => {
    if (files) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const cols = [...Object.keys(results.data[0] as string[])]

          if (JSON.stringify(cols) == JSON.stringify(CSV_VALID_COLS)) {
            const smtComponents: SmtComponent[] = results.data.map(
              (element: any) => {
                return {
                  id: element['Part ID'],
                  value: element['Value'],
                  package: element['Package'],
                  stockCode: element['Stock Code'],
                  layer: element['Layer'],
                  rotation: Number(element['Rotation']),
                  x: Number(element['X']),
                  y: Number(element['Y']),
                } as SmtComponent
              }
            )

            smtComponents.sort((a, b) =>
              a.value > b.value ? 1 : b.value > a.value ? -1 : 0
            )

            setComponents(dispatch, smtComponents, files[0].name.split('.')[0])
          } else {
            //File non valido
            alert('File CSV non valido!')
          }
        },
      })
    }
  }

  return (
    <FileUploadButton
      className={className}
      title={title}
      handleFileCallback={fileHandler}
      fileFormat={fileFormat}
    />
  )
}

export default CsvFileUploader
