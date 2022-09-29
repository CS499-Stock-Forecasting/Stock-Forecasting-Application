import React from 'react';
import './Intro.css';

function Intro() {
  return (
    <div className='introBody'>
      <h1 className='introBodyH1'>Predict future trends of a stock with past data</h1>
      <div className='introBodyText'>
        What if you could see into the future? What if you knew when a stock was
        overvalued or undervalued? If so, you would be able to successfully “time the market”.
        The application of this project is to give users the ability to visualize the future performance 
        of any stock to provide them with a good indication of when to buy and sell a particular stock. 
       </div>
       <button className='introBodyButton' style={{background: "lightgreen" , width:'15%', border: '0px', height:'45px' }} >Get Started</button>
    </div>
  )
}

export default Intro