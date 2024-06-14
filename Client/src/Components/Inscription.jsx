
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

    if(password !== passwordConfError || password.length < 8 || !terms.checked) {
      if (password !== passwordControl) {
        passwordConfError.innerHTML ="Les mots de passe ne correspondent pas"
      }
      if(password.length < 8) {
        passwordConfError.innerHTML ="Mot de passe trop court, minimum 8 caractères"
      }
      if(!terms.checked){
        termsError.innerHTML="Veuillez accepter les conditions générales"
      }
    } else {
      await axios({
        method:"post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          name,
          email,
          address
        }
      })
      .then((res)=> {
        if (res.data.errors){
          nameError.innerHTML = res.data.errors.name 
          emailError.innerHTML = res.data.errors.email
          addressError.innerHTML = res.data.errors.address  
          passwordError.innerHTML = res.data.errors.password 
        } else {
          setFormSubmit(true)
        }
      })
      .catch((err)=> console.log(err))
    }
  }

  return (
    <div>Inscription</div>
  )
}
