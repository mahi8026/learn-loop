import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-base-200">
      
        <Helmet>
          <title>404 Not Found - Learn Loop</title>
        </Helmet>
      
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8 text-gray-600">But don't worry, you can find plenty of other things on our homepage.</p>
          <Link to="/" className="btn btn-primary">Back to homepage</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound