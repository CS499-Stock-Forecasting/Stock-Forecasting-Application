import React from 'react'
import './Header.css'
import logo from './logo.png'


function Header() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='navContainter'>
            <span className="logo"><img className='headerLogo' src={logo} alt= "Img" height={25} width={25}></img>Stock Application</span>
            <div className='navRedirects' id='collapsibleNavbar' >
                <a href="#Features" data-rr-ui-event-key="#Features" className='navlinks' style={{textDecoration: "none", color: "black"}}>Features</a>
            </div>
            <div className='navButton'>
            <button className='introBodyButton' style={{background: "lightgreen" , width:'150%', border: '0px', height:'45px' }} >Get Started</button>
            </div>
            </div>
        </nav>
    </div>
  )
}

export default Header