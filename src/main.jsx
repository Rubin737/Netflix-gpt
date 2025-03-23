import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { appRouter } from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { appStore } from './utils/Slices/appStore'


createRoot(document.getElementById('root')).render(
  
    <Provider store={appStore}>
    <RouterProvider router={appRouter}>
      <App/>
    </RouterProvider>
    </Provider>
  
)
