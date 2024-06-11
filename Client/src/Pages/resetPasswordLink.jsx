import React, {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export const ResetPasswordLink = () => {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(false)

  const mailValue = (e) => setEmail(e.target.value)

  const sendLink = async (e) => {
    e.preventDefault()

    if (email === "") {
      toast.error("Email requis", {
        position: "top-center"
      })
    } else if (!email.includes("@")) {
      toast.warning("Il faut le @ dans votre mail", {
        position:"top-center"
      })
    } else {
      const res = await axios({
        method:"post",
        url: `${process.env.REACT_APP_API_URL}api/user/resetPasswordLink`,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
      })

      const data = await res.json()

      if (data.status = 201) {
        setEmail("")
        setMessage(true)
      } else {
        toast.error("Utilisateur introuvable", {
          position: "top-center"
        })
      }
    }
  }
  return (
    <div>ResetPasswordLink</div>
  )
}

