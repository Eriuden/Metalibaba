import React, {useState, useContext} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'
import {Squash as Hamburger} from "hamburger-react"
import { Logout } from './Logout'

export const Header = () => {
  const [hamburger, setHamburger] = useState(false)
  const uid = useContext(UidContext)
  const userData = useSelector((state)=> state.userReducer)

  return (
    <div>
      <h1>
        Metalibaba 
      </h1>

      <nav className='hidden flex-row justify-around mt-0 sm:flex'>
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
            <Link to={"/connexion"}>Connexion</Link>
            <Link to={"/inscription"}>Inscription</Link>
          </>
        )}
      </nav>

      <h2 className='flex m-3 sm:hidden' onClick={()=> setHamburger(!hamburger)}>
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
            </>
          ) : (
            <>
              <Link to={"/connexion"}>Connexion</Link>
              <Link to={"/inscription"}>Inscription</Link>
            </>
          )}
        </nav>
      ): ""}
    </div>
  )
}
