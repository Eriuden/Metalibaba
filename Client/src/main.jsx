import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './Redux/Reducers/indexReducer.js'
import './index.css'
//import { getAllArticles } from './Redux/Actions/Article.action.js'
//import { getUsers } from './Redux/Actions/Users.action.js'

const store = configureStore({reducer:reducers})

//store.dispatch(getAllArticles)
//store.dispatch(getUsers)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
