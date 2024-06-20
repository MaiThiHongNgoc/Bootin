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
      <h1>hello</h1>
    </div>
  )
}

export default Home