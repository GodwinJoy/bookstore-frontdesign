import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextShare from './contextAPI/ContextShare.jsx'
import AuthContext from './contextAPI/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   <GoogleOAuthProvider clientId='759018731933-gj6aei9t7u0n503vbmuq0mehqm5no95l.apps.googleusercontent.com'> 
    <ContextShare>
      <AuthContext>
        <App />
        </AuthContext>
      </ContextShare>
    </GoogleOAuthProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
