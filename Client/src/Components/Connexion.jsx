import React, {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Connexion = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    const emailError = document.querySelector(".email.error")
    const passwordError = document.querySelector(".password.error")

    axios({
      method:"post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      },
    })
      .then((res)=> {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email 
          passwordError.innerHTML = res.data.errors.password 
        } else {
          window.location = "/"
        }
      })
      .catch((err)=> {
        console.log(err)
      })
  }

  return (
    <div>

      <form action='' onSubmit={handleLogin} className="bg-slate-100 border-l-4
       rounded-md border-2 border-black mx-6 my-4 sm:mx-40 md:text-base 
       lg:mx-96 text-base flex flex-col items-center p-2">

        <label htmlFor='email'>Email</label>
        

        <input className="border-2 border-black"
        type="text" name="email" id="email" 
        onChange={(e)=> setEmail(e.target.value)} value={email}/>

        <div className='email error'></div>
        <br/>

        <label htmlFor='password'>Mot de passe</label>
        

        <input className='border-2 border-black' type="password" name='password'
        id='password' onChange={(e)=> setPassword(e.target.value)} value={password}
        />
        <div className='password error'></div>
        <br/>

        <input className='border-2 border-black my-2 px-2' type="submit"
        value="connexion" />

        <Link to={"reset-password"} className="my-4 px-2">
          Mot de passe Oublié ?
        </Link>

       </form>

    </div>
  )
}
