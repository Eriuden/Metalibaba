import { useState, useEffect } from 'react'
import axios from 'axios'
import {Header} from "./Components/Header"
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Home } from './Pages/Home'
import { Connexion } from './Pages/Connexion'
import { Inscription } from './Pages/Inscription'
import { Searcher } from './Components/Searcher'
//getUser
import './App.css'
import { UserProfile } from './Pages/UserProfile'
import { ResetPasswordLink } from './Pages/ResetPasswordLink'
import { UpdatePassword } from './Pages/UpdatePassword'
import { ArticlePage } from './Pages/ArticlePage'

function App() {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=> {
    const fetchToken = async () => {
      await axios({
        method:"get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        setUid(res.data)
      })
      .catch(() => console.log("Pas de tokens"))
    }
    fetchToken
    if (uid) dispatch(getUser(uid))
  }, [uid])

  return (
    <>
      <div>
        <Header/>
        <Searcher/>
        <Routes>
          <Route exact path={"/"} element={<Home/>}/>
          <Route exact path={"/connexion"} element={<Connexion/>}/>
          <Route exact path={"/inscription"} element={<Inscription/>}/>
          <Route exact path={"/user-profile/:id"} element={<UserProfile/>}/>
          <Route exact path={"/reset-password"} element={<ResetPasswordLink/>}/>
          <Route exact path={"/update-password"} element={<UpdatePassword/>}/>
          <Route exact path={"/article-page/:id"} element={<ArticlePage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
