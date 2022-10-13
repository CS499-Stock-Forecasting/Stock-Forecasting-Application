import React, { Component } from "react";
import axios from "axios";
import Frontpage from "./frontpage/Frontpage";
import Application from "./applicationpage/Application";

import {Route, Routes} from 'react-router-dom'

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       value: '', // text field
  //       stockData: [],
  //       databaseContainsTicker: false,
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // componentDidMount() {
  //   this.getStockData();
  // }

  // getStockData = (ticker) => {
  //   // reset stock data
  //   // this.setState({value: '', stockData: [], databaseContainsTicker: false });
  //   axios
  //       .get("/api/stockForecasting/" + ticker)
  //       // .then((res) => this.setState({value: ticker, stockData: res.data, databaseContainsTicker: true }))
  //       .then((res) => console.log(res.data))

  //       .catch((err) => {
  //           // alert("Stock data not in database");
  //           this.setState({value: '', stockData: [], databaseContainsTicker: false });
  //   });
  // };


  // handleChange(event) {
  //   this.setState({value: event.target.value});
    
  // }

  // handleSubmit(event) {
  //   this.getStockData(this.state.value);
  //   event.preventDefault();
  // }

  // renderSearchBar = () => {
  //   return (
  //       <form onSubmit={this.handleSubmit}>
  //       <label>
  //         Ticker:
  //         <input type="text" value={this.state.value} onChange={this.handleChange} />
  //       </label>
  //       <input type="submit" value="Submit" />
  //     </form>
  //   );
  // };

   render() {
    return (
      // <main className="container">
      //   <h1 className="text-uppercase text-center my-4">Stock Forecasting</h1>
      //   <div className="card p-3 text-center">
      //       {this.renderSearchBar()}
      //   </div>
      // </main>

        <Routes>
          <Route path='/' element={<Frontpage></Frontpage>}/>
          <Route path='/home' element={<Frontpage></Frontpage>}/>
          <Route path='/app' element={<Application/>}/>

        </Routes>
    );
  }
}

export default App;