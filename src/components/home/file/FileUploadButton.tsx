import { useRef } from 'react'
import { Button, Container } from 'react-bootstrap'

interface FileUploadButtonProps {
  className: string
  handleFileCallback: Function
  title: string
  fileFormat: string
}

const FileUploadButton = ({
  handleFileCallback,
  title,
  className,
  fileFormat,
}: FileUploadButtonProps) => {
  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <Container>
      <input
        ref={fileInput}
        onChange={(e) => handleFileCallback(e.target.files)}
        type='file'
        style={{ display: 'none' }}
        multiple={false}
        accept={fileFormat}
      ></input>
      <button className={className} onClick={() => fileInput?.current?.click()}>
        {title}
      </button>
    </Container>
  )
}

export default FileUploadButton
