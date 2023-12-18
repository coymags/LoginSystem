import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "./components/Register"
import Login from "./components/Login"
import UserAccount from './components/UserAccount'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<UserAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
