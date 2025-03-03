import React from 'react'
import "../node_modules/tailwindcss/dist/default-theme.mjs"
import Navbar from './component/Navbar/Navbar'
import HeroSection from './component/Home/HeroSection'
import HomeSection2 from './component/Home/HomeSection2'
import HomeSection3 from './component/Home/HomeSection3'
import { RouterProvider } from 'react-router-dom'
import { routingPage } from './component/Router/RouterPage'
import SaffranStays from './component/SaffranStays'
import Aos from 'aos'
import "aos/dist/aos.css";
import SmoothScroll from './SmoothScroll'

import TentsContext from './component/AppContext/TentsContext'

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

<SmoothScroll />
      <TentsContext>
        <RouterProvider router={routingPage}>
          <SaffranStays />
        </RouterProvider>
      </TentsContext>
    </div>
  )
}

export default App