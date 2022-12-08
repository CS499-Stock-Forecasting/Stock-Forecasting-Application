import React from 'react'
import './Header.css'
import logo from './logo.png'
import {Link} from 'react-router-dom'
import Modal from '../components/Modal'
import {useState} from 'react'


function Header() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='navContainter'>
            <span ><Link to = '/' className="logo" style = {{textDecoration: "none", color:"black"}}><img className='headerLogo' src={logo} alt= "Img" height={25} width={25}></img>Stock Application</Link></span>
            <div className='navRedirects' id='collapsibleNavbar' >
                <a href="#Features" data-rr-ui-event-key="#Features" className='navlinks' style={{textDecoration: "none", color: "black"}}>Features</a>
            </div>
            <div className='navButton'>
              <button className='introBodyButton' 
              //onClick={() => {setOpenModal(true);}}
                style={{background: "lightgreen" , width:'150%', border: '0px', height:'45px' }}>
              <Link to = '/app' style = {{textDecoration: "none", color:"black"}}>Get Started</Link>
              </button>
            </div>
            </div>

        </nav>
        {openModal && <Modal closeModal={setOpenModal}/>}

    </div>
  )
}

export default Header