import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@sweetalert2/theme-dark'
import './index.css'
import 'trix/dist/trix.esm'
import 'trix/dist/trix.css'

/* ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) */

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
