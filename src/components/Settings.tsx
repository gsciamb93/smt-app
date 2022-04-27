import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../constants/Constants'
import GCodeSettings from './settings/GCodeSettings'
import RailSettings from './settings/RailSettings'

const Settings = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Container className='mb-4 mt-4'>
        <Button onClick={() => navigate(PATHS.HOME)}>🏠 Home</Button>
      </Container>
      <Container>
        <GCodeSettings />
        <RailSettings />
      </Container>
    </Container>
  )
}
export default Settings
