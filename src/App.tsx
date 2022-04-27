import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { PATHS } from './constants/Constants'
import Settings from './components/Settings'

const App = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.SETTINGS} element={<Settings />} />
    </Routes>
  )
}

export default App
