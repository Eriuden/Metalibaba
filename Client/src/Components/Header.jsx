import React, {useState, useContext} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'
import {Squash as Hamburger} from "hamburger-react"
import { Logout } from './Logout'
import { Connexion } from '../Pages/Connexion'
import { Inscription } from '../Pages/Inscription'
import ReactModal from 'react-modal'

export const Header = () => {
  const [hamburger, setHamburger] = useState(false)
  const [connexionModal, setConnexionModal] = useState(false)
  const [inscriptionModal, setInscriptionModal] = useState(false)
  const uid = useContext(UidContext)
  const userData = useSelector((state)=> state.userReducer)
  const cartData = useSelector((state)=> state.cartReducer)

  return (
    <div>
      <h1>
        Metalibaba 
      </h1>

      <nav className='hidden sticky flex-row justify-around mt-0 sm:flex'>
        <Link to={"/"}>Acceuil</Link>

        {uid ? (
          <>
            <Link to={"/user-profile/:id"}>
              <h5>Bienvenue {userData.name}</h5>
            </Link>

            <Logout/>
          </>
        ) :(
          <>
            <span onClick={setConnexionModal(!connexionModal)
            && setInscriptionModal(false)}>
              Connexion
            </span>

            <span onClick={setInscriptionModal(!inscriptionModal) 
            && setConnexionModal(false)}>
              Inscription
            </span>

            {connexionModal ? (
              <ReactModal isOpen={true}><Connexion/></ReactModal>
            ) : ""}

            {inscriptionModal ? (
              <ReactModal isOpen={true}><Inscription/></ReactModal>
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
                <h5>Bienvenue {userData.name}</h5>
              </Link>

              <Logout/>

              <div>
                <span>{cartData.cart.length}</span>
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
