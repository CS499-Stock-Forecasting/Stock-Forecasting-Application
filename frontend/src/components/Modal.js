import React from 'react'
import {Link} from 'react-router-dom'
import './Modal.css'

function Modal({closeModal}) {
  return (
    <div className = "modalBackground">
        <div className='modalContainer'>

            <div className='modalCloseButton'>
            <button onClick={() => closeModal(false)}>X</button>
            </div>

            <div className='modalTitle'> 
                <h1>Login</h1>
            </div>

            <div className='modalBody'> 
            <label>UserName</label>
            <input></input>
            <label >Password</label>
            <input></input>
            </div>

            <div className='modalFooter'> 
                <button ><Link to = '/app' style = {{textDecoration: "none", color:"black"}}>Login </Link></button>

            </div>
        </div>

    </div>
  )
}

export default Modal