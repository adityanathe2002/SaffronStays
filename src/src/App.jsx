import React from 'react'
import "../node_modules/tailwindcss/dist/default-theme.mjs"
import { RouterProvider } from 'react-router-dom'
import { routingPage } from './component/Router/RouterPage'
import SaffranStays from './component/SaffranStays'
import Aos from 'aos'
import "aos/dist/aos.css";


import TentsContext from './component/AppContext/TentsContext'
import CustomCursor from './component/CustomCursor'

const App = () => {
  React.useEffect(() => {
    Aos.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    Aos.refresh();
  }, []);
  return (
    <div>
 <CustomCursor />
      <TentsContext>
        <RouterProvider router={routingPage}>
          <SaffranStays />
        </RouterProvider>
      </TentsContext>
    </div>
  )
}

export default App

