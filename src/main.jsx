import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n/i18next.jsx"
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
   
)
