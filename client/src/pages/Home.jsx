import React from 'react'
import { useState } from 'react'
import UserResults from '../components/user/UserResults'
import SearchForm from '../components/user/SearchForm'

function Home() {

  const [selectedPlanets, setSelectedPlanets] = useState();

  return (
    <>
      <SearchForm setSelectedPlanets={setSelectedPlanets} />
      <br></br>
      {selectedPlanets && <UserResults {...selectedPlanets}/>}
    </>
  )
}

export default Home