import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

import { store } from './App/store.js'
import axios from 'axios'
import { checkUserSession } from './utils/session.js'
// import {setUser} from "./Features/authSlice.js"

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
