import React, {useState, useContext, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'
import {Squash as Hamburger} from "hamburger-react"
import { Logout } from './Logout'
import { Connexion } from './Connexion'
import { Inscription } from './Inscription'
import ReactModal from 'react-modal'

export const Header = () => {
  const [hamburger, setHamburger] = useState(false)
  const [connexionModal, setConnexionModal] = useState(false)
  const [inscriptionModal, setInscriptionModal] = useState(false)
  const [uidMessage, setUidMessage] = useState("")
  const [cartNumber, setCartNumber] = useState(0)
  const uid = useContext(UidContext)

  const userData = useSelector((state)=> state.userReducer)
  const cartData = useSelector((state)=> state.cartReducer)

  const switchConnexion = () => {
    setConnexionModal(!connexionModal) 
    setInscriptionModal(false)
  }

  const switchInscription = () => {
    setInscriptionModal(!inscriptionModal) 
    setConnexionModal(false)
  }

  useEffect(()=> {
    if (uid) {
      setUidMessage(`Bienvenue ${userData.name}`)
      setCartNumber(`${cartData.cart.length}`)
    }
  },[uid, userData, cartData])

  return (
    <div className='bg-gray-900 bg-cover'>
      <h1 className='text-gray-400 text-center'>
        Metalibaba 
      </h1>

      <nav className='hidden sticky flex-row justify-around mt-2 sm:flex'>
        <Link to={"/"} className ="text-gray-400">Acceuil</Link>

        {uid ? (
          <>
            <Link className ="text-gray-400" to={"/user-profile/:id"}>
              <h5>{uidMessage}</h5>
            </Link>

            <Logout/>

            <div>
                <span className='spanCart'>{cartNumber}</span>
                <Link className ="text-gray-400" to={"/cart"}/>
            </div>
          </>
        ) :(
          <>
            <span className ="text-gray-400" onClick={switchConnexion}>
              Connexion
            </span>

            <span className ="text-gray-400" onClick={switchInscription}>
              Inscription
            </span>

            {connexionModal ? (
              <ReactModal ariaHideApp={false} className="max-w-[100%] p-2"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true} isOpen={connexionModal ? true : false}>
                <span className='bg-slate-50 py-2 px-4 mx-[83%] md:mx-[74%] lg:mx-[57%] xl:mx-[65%] 2xl:mx-[75%]
                mt-[20%] rounded-md cursor-pointer' onClick={switchConnexion}>
                X</span>
                <Connexion/>
              </ReactModal>
            ) : ""}

            {inscriptionModal ? (
              <ReactModal ariaHideApp={false} className= "max-w-[100%] p-2"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true} isOpen={inscriptionModal ? true : false}>
                <span className='bg-slate-50 py-2 px-4 mx-[75%] mt-[20%] rounded-md cursor-pointer' onClick={switchInscription}>
                X</span>
                <Inscription/>
              </ReactModal>
            ) : ""}
          </>      
        )}
      </nav>

      <h2 className='flex m-3 sm:hidden sticky' onClick={()=> setHamburger(!hamburger)}>
        <Hamburger/>
      </h2>

      {hamburger ? (
        <nav className='flex flex-col items-start justify-start border-spacing-1
        ml-3.5 absolute border-2 border-black opacity-100 sm:hidden'>
          <Link to={"/"}>Acceuil</Link>

          {uid ? (
            <>
              <Link to={"/user-profile/:id"}>
                <h5>{uidMessage}</h5>
              </Link>

              <Logout/>

              <div>
                <span>{cartNumber}</span>
                <Link to={"/cart"}/>
              </div>
              
            </>
          ) : (
            <>
              <Link to={"/login"}>Connexion</Link>
              <Link to={"/register"}>Inscription</Link>
            </>
          )}
        </nav>
      ): ""}
    </div>
  )
}
