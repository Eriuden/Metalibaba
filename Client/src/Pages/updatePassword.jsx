
import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ToastContainer, Toast  } from 'react-toastify'

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
  }
  return (
    <div>UpdatePassword</div>
  )
}
