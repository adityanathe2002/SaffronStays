import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
// const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <div>
    <Toaster position='top-center' reverseOrder={false} />
    {/* <Suspense fallback={<div>Loading...</div>}> */}
    <App />
    {/* </Suspense> */}
  </div>,
)
