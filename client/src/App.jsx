import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Layout />}>
        <Route
          index
          element={<IndexPage />}
        />
        <Route
          path='/login'
          element={<LoginPage />}
        />
      </Route>
    </Routes>
  )
}

export default App
