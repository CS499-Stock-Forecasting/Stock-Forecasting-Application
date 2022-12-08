import React, { Component } from "react";
import axios from "axios";
import Frontpage from "./frontpage/Frontpage";
import Application from "./applicationpage/Application";

import {Route, Routes} from 'react-router-dom'

class App extends Component {

   render() {
    return (

        <Routes>
          <Route path='/' element={<Frontpage></Frontpage>}/>
          <Route path='/home' element={<Frontpage></Frontpage>}/>
          <Route path='/app' element={<Application/>}/>

        </Routes>
    );
  }
}

export default App;