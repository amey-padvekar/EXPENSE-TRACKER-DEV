import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div style={{position:"relative", minHeight:"100vh"}} >
      <Header/>
      <div className='content container-fluid' >
          {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout