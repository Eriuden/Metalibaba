
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link, json } from 'react-router-dom'
import { ToastContainer, toast  } from 'react-toastify'

export const UpdatePassword = () => {

  const {id , token} = useParams()

  const validUser = useNavigate()

  const [data, setData] = useState(false)
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const userValid = async() => {
    const res = await axios({
      method:"get",
      url: `${process.env.REACT_APP_API_URL}api/user/updatePassword/${id}/${token}`,
      headers: {
        "Content-Type" :"application/json"
      }
    })

    const data = await res.json()

    if (data.status == 201) {
      console.log("utilisateur valide")
    } else {
      validUser("")
    }
  }

  const setValue = (e) => {
    setPassword(e.target.value)
  }

  const sendPassword = async(e) => {
    e.preventDefault()

    if (password === "") {
      toast.error("Mot de passe exigé", {
        position:"top-center"
      })
    } else if (password.length < 8) {
      toast.error("Mot de passe trop court, 8 caractères minimum", {
        position:"top-center"
      })
    } else {
      const res = await axios({
        method:"post",
        url: `/${id}/${token}`,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({password})
      })

      const data = await res.json()

      if (data.status === 201) {
        setPassword("")
        setMessage(true)
      } else {
        toast.error(" Token expiré !", {
          position:"top-center"
        })
      }
    }
  }

  useEffect(()=> {
    userValid()
    setTimeout(()=> {
      setData(true)
    }, 3000)
  }, [])


  return (
    <div>
      {data ? (
        <div>
          <div>
            <h2>
              Entrez votre nouveau mot de passe
            </h2>
          </div>

          <form>
            {message ? <p>Mot de passe mis à jour avec succés</p> :""}

            <label htmlFor='password'>Nouveau mot de passe</label>
            <input type="password" value={password} onChange={setValue}
            name="password" id='password' placeholder='Entrez votre nouveau
            mot de passe'/>
            <button onClick={sendPassword}>Envoyer</button>
          </form>

          <p> <Link to={"/"}>Accueil</Link></p>
          <ToastContainer/>
        </div>
      ) :""}
    </div>
  )
}
