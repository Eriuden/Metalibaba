
import React, {useState} from 'react'
import axios from 'axios'

export const Inscription = () => {

  const [formSubmit, setFormSubmit] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [passwordControl, setPasswordControl] = useState("")

  const handleRegister = async(e)=> {
    e.preventDefault()
    const terms = document.getElementById("terms")
    const nameError = document.querySelector(".name.error")
    const emailError = document.querySelector(".email.error")
    const addressError = document.querySelector(".address.error")
    const passwordError = document.querySelector(".password.error")
    const passwordConfError = document.querySelector(".password-conf.error")
    const termsError = document.querySelector(".terms.error")
    passwordConfError.innerHTML=""
    termsError.innerHTML=""
  }

  return (
    <div>Inscription</div>
  )
}
