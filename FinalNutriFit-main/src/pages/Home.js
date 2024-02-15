import React from 'react'
import Veggie from "../Component/veggie";
import Popular from "../Component/popular";
import Search from "../Component/Search";
import Category from '../Component/Category';

const Home = () => {
  return (
    <div>
      <Category />
          <Popular />
          <Veggie />
    </div>
  )
}

export default Home