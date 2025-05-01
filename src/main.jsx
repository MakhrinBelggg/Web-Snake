import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from './App.jsx'
import Auth from './auth.jsx'
import SnakeGame from './snakegame.jsx'
import Scoreboard from './Scoreboard.jsx' 
import NotFoundPage from './components/NotFoundPage.jsx'

const router = createBrowserRouter([
  {
    path:"/", 
    element: <Auth />
  },
  {
    path:"/game", 
    element: <SnakeGame />
  },
  {
    path:"/scoreboard", 
    element: <Scoreboard />
  },
  {
    path:"*", 
    element: <NotFoundPage />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <RouterProvider router={router}/>
  </StrictMode> 
)
