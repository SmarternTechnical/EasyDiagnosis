import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IsLoggedInProvider from './Context/IsLoggedInProvider.jsx'
import UserContextProvider from './Context/UserContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <IsLoggedInProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
  </IsLoggedInProvider>
  // </StrictMode>,
)
