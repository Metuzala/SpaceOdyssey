import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Navbar from '../src/components/layout/Navbar'
import Flights from './pages/Flights'
import Reservation from './pages/Reservation'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
     <Router>
      <div>
        <Navbar />
        <main>
        <Routes>
        <Route path='/flights' element={<Flights />} />
        <Route path='/reserv' element={<Reservation />} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Home />} />
        </Routes>
        </main>
      </div>
    </Router>
    </>
  )
}

export default App