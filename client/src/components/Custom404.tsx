import React from 'react'
import { Link } from 'react-router-dom'

function Custom404() {
  return (
    <>
    <div className="max-w-xl mx-auto flex flex-col justify-center items-center my-20">
        <img src="https://images.unsplash.com/photo-1685367024091-12959d6430ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full py-2 w-[30vh] h-full
        md:w-[50vh]' />
        <h1 className='font-extrabold text-3xl'>404 not found</h1>
        <h1 className='text-xl'>Go to <Link to="/" className='underline cursor-pointer underline-offset-3 text-[#5C753B]'>Home</Link>
        </h1>
        <p className="py-10 md:py-0">
        Check top referrers{" "}
        <Link to="/leaderboard">
          <span className="text-green-900 underline">here</span>
        </Link>
      </p>
    </div>
    </>
  )
}

export default Custom404
