import { useEffect, useRef } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './components/features/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Regiser from './pages/Register'
import Forget from './pages/Forget-Password'
import ProectRouter from './utils/ProtectRoute'
import Join from './pages/Join'
import Host from './pages/Host'
import Metting from './pages/Metting'
import socketIOClient from "socket.io-client";
import Reset from './pages/Reset-Password'
import ProfileCard from './pages/Profile'
import Travel from './pages/Travel'
function App() {
  const socketIo = useRef<ReturnType<typeof socketIOClient> | null>(null)
  useEffect(() => {
    socketIo.current = socketIOClient('http://localhost:5000')
    console.log(socketIo);
  }, []);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProectRouter />} >
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/host" element={<Host />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/meeting/:id" element={<Metting socketIo={socketIo} />} />
        </Route>
        <Route path='/login' element={user ? <Home /> : <Login />}>
        </Route>
        <Route path='/register' element={user ? <Home /> : <Regiser />}>
        </Route>
        <Route path='/forget-password' element={user ? <Home /> : <Forget />}>
        </Route>
        <Route path='/reset-password/:id' element={user ? <Home /> : <Reset />}></Route>
        <Route path='/travel' element={user ? <Travel /> : <Login />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
