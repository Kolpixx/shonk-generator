import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './sites/App/App.jsx'
import Credits from './sites/Credits/Credits.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/credits", element: <Credits />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
