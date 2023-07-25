import { Route, Routes } from 'react-router'
import './App.css'
import IndexPage from './pages/IndexPage'

const App = () => {
  return (
    <Routes>
      <Route
        index
        path='/'
        element={<IndexPage />}
      />
    </Routes>
  )
}

export default App
