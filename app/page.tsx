import React from 'react'
import Hello from "@/components/hello"
import MyButton from '../components/button'

const Home = () => {
  return (
    <main>
    <div className="text-5xl underline"> Welcome to School of Rizz</div>
    <Hello />
    <MyButton />

    </main>
  )
}

export default Home