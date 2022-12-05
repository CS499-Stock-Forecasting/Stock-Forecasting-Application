import React from 'react'
import './HeaderApp.css'
import logo from './logo.png'
import {Link} from 'react-router-dom'
import avatar from './avatar.png'

function HeaderApp() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='navContainter'>
            <span ><Link to = '/' className="logo" style = {{textDecoration: "none", color:"black"}}><img className='headerLogo' src={logo} alt= "Img" height={25} width={25}></img>Stock Application</Link></span>

            {/* <div className='avatarbutton'>
                <img className='avatarPic' src={avatar} alt= "Img" height={25} width={25}></img>
                <Link to = '/app' className = 'avatarName' style = {{textDecoration: "none", color:"black"}}>User</Link>
            </div> */}
            </div>
        </nav>
    </div>
  )
}

export default HeaderApp