import React from 'react'
import './Home.css'
import Header from '../../Component/Header/Header'
import Slide from './Slider/Slide'
import Welcome from './Welcome/Welcome'
import Banner from './Banner/Banner'
import Footer from '../../Component/Footer/Footer'


const Home = () => {
  return (
    <div>
      <Header/>
      <Slide/>
      <Welcome/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home