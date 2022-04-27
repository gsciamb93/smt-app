import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { DATA_TYPES } from '../../../constants/Constants'

interface FileDownloadButtonProps {
  className: string
  title: string
  dataToSave: any
  dataType: string
  fileName: string
}

const FileDownloadButton = ({
  className,
  title,
  dataToSave,
  dataType,
  fileName,
}: FileDownloadButtonProps) => {
  return (
    <Container>
      <a
        className={className}
        href={`${dataType};charset=utf-8,${encodeURIComponent(
          dataType == DATA_TYPES.JSON ? JSON.stringify(dataToSave) : dataToSave
        )}`}
        download={fileName}
      >
        {title}
      </a>
    </Container>
  )
}
export default FileDownloadButton
