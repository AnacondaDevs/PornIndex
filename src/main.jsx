import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

// Aplicar estilo inline al root para fondo oscuro y color claro
rootElement.style.backgroundColor = '#121212'
rootElement.style.color = '#eee'
rootElement.style.minHeight = '100vh'
rootElement.style.fontFamily = 'Arial, sans-serif'
rootElement.style.margin = '0'
rootElement.style.padding = '0'

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
