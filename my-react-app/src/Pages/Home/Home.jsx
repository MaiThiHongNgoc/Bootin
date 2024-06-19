import React from 'react'
import './Home.css'
import Slide from './Slider/Slide'
import Welcome from './Welcome/Welcome'
import Banner from './Banner/Banner'


const Home = () => {
  return (
    <div>
      <Slide/>
      <Welcome/>
      <Banner/>
    </div>
  )
}

export default Home