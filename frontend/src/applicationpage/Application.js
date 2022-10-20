import React, { Component } from 'react'
import Header from '../header/Header'
import axios from "axios";
import './Application.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Plot from 'react-plotly.js';


export class Application extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '', // text field
            stockData: [],
            databaseContainsTicker: false,
            ticker: '',
            stockInfo: [],
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {


        // this.getStockData();
      }
      
      getStockData = (ticker) => {
        // reset stock data
        // this.setState({value: '', stockData: [], databaseContainsTicker: false });
        // axios
        //     .get("/stockForecasting/" + ticker)
        //     // .then((res) => this.setState({value: ticker, stockData: res.data, databaseContainsTicker: true }))
        //     .then((res) => {
        //         // stockData(res.data);
        //         // this.setState({stockInfo: res.data})
        //         console.log(res.data);
        //     })
    
        //     .catch((err) => {
        //         // alert("Stock data not in database");
        //         this.setState({value: '', stockData: [], databaseContainsTicker: false });
        // });


        axios.get("/stockForecasting/")

        .then((res) => {console.log(res.data[0].data["Meta Data"]);

            this.setState({stockInfo: res.data[0].data["Meta Data"]});
        });

      };
        handleChange(event) {
            this.setState({value: event.target.value});
          }
        
          handleSubmit(event) {
            this.getStockData(this.state.value);
            event.preventDefault();
          }    
        //   renderItems = () => {
        //     const ticker  = this.value;
        //   }
  
    render() {
    const {stockInfo} = this.state  
    return (
        <div>
            <Header/>
            <div className='applicationForm'>

            <form onSubmit={this.handleSubmit}>
                <label>
                    Ticker:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                
                <input type="submit" value="Submit" className="btn btn-secondary mr-2"/>
            </form>

            </div>



            {/* <ui>{this.state.stockInfo.map(stockInfo => <li>{stockInfo.symbol}</li>)} </ui>   */}
            <div>
            <div >{this.state.stockInfo["2. Symbol"]}</div>
            {/* key= {this.state.stockInfo["1. Infomation"]} */}
            {/* {Object.keys(this.state.stockInfo).map((this) */}
            </div>





            <div className='plotGraph'>
                <Plot 
                    data={[
                        { 
                            x: [1, 2, 3,3, 4,5,6,7,8,9],
                            y: [2, 5 ,7,3, 9,4,8,5,7,2,1],
                            type: "scatter",
                            mode: "lines",
                            name: 'AAPL High',
                            line: {color: '#17BECF'},
                        },
                        { 
                            x: [1, 2, 3, 4 , 5 ],
                            y: [2, 6, 3, 4 , 6 ],
                            type: "scatter",
                            mode: "lines",
                            name: 'AAPL low',
                            line: {color: '#7F7F7F'},
                        },
                    ]}

                    layout={ {width: 1400, height: 480, title: `${this.state.stockInfo["2. Symbol"]} Stock`,
                    xaxis: {
                        // range: ['2016-07-01', '2016-12-31'],
                        type: 'date'
                    },
                    yaxis: {
                        autorange: true,
                        // range: [86.8700008333, 138.870004167],
                        type: 'linear'
                    }} }
                />

            </div>
        </div>
      )
  }
}

export default Application