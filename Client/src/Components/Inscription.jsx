
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
    <div className='flex flex-col'>
      <>
        {formSubmit ? (
          <>
            <h4> Votre inscription s'est bien déroulé,
              vous pouvez vous connecter
            </h4>
          </>
        ) : (
          <form action='' onSubmit={handleRegister} className="bg-slate-50 flex
           flex-col border-2 border-l-4 rounded-md border-black mx-12
            my-4 md:mx-[20%] lg:mx-[20%]">

              <label htmlFor='name' className='my-2'>Votre nom</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type="text" name='name' value={name} 
              onChange={(e)=> setName(e.target.value)}/>
              <div className='name error'></div>

              <label htmlFor='email' className='my-2'>Votre adresse mail</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type="text" name='email' value={email} 
              onChange={(e)=> setEmail(e.target.value)}/>
              <div className='email error'></div>

              <label htmlFor='address' className='my-2'>Votre adresse</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type="text" name='address' value={address} 
              onChange={(e)=> setAddress(e.target.value)}/>
              <div className='address error'></div>

              <label htmlFor='password' className='my-2'>Votre mot de passe</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type='password' name='password' value={password} 
              onChange={(e)=> setPassword(e.target.value)}/>
              <div className='password error'></div>

              <label htmlFor='name' className='my-2'>Confirmer votre mot de passe</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type='password' name='password-conf' value={passwordControl} 
              onChange={(e)=> setPasswordControl(e.target.value)}/>

              <label className='mx-8 my-2 md:mx-12' htmlFor='terms'>
                J'accepte les <a className='underline' href='/'>Conditions générales</a>
              </label>
              <input type="checkbox" id='terms' />
              <div className='terms error'></div>

              <input type="submit" className='border-2 border-black my-2 mx-[25%] 
              xs:mx-[40%] sm:mx-[42%] md:mx-[40%] lg:mx-[43%] xl:mx-[43%]
              2xl:mx-[43%]' value="inscription" />

          </form>
        )}
      </>
    </div>
  )
}
