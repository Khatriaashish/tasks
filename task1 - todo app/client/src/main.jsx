import React from 'react'
import ReactDOM from 'react-dom/client'
import {Routing} from './routing/routing.config.jsx'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>
)
