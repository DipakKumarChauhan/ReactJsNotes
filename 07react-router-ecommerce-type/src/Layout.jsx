import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const Layout = () => {
  return (
    <>
    {/* Here Jo bhi Header and Footer ke bich me hoga in Out Let sirf vo change hoga baki headr and footer same rahenge  optimes way agar kabhi
    aisa ho kki maan lo header and footer ko har page me same rakhna ho fir vo about Us ho Gallery ho ya jo bhi ho but geader and footer same rahenge tab use kare
    Outlet se jo bich me hoga usi pe changes honge
    
    */}
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout