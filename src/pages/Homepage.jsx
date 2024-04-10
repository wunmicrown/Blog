import React from 'react'
import PublicPosts from './posts/PublicPosts'
import Category from '../components/Category'

const Homepage = () => {
  return (
    <>
      <Category />
      <PublicPosts />
    </>
  )
}

  export default Homepage