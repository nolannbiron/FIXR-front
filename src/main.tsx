import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.scss'
import 'react-spring-bottom-sheet/dist/style.css'
import 'react-toastify/dist/ReactToastify.css'
import 'rc-drawer/assets/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
