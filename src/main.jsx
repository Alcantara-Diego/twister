import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {AuthGoogleProvider} from './contexts/AuthGoogle'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthGoogleProvider>
        <App />
      </AuthGoogleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
