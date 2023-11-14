import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import dotenv from 'dotenv'

dotenv.config()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
