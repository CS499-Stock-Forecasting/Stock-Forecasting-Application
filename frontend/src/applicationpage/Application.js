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
            stockOpen: [],
            stockDate: [],
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
            console.log(res.data[0].data["Time Series (Daily)"]);

            this.setState({stockInfo: res.data[0].data["Meta Data"]});
            this.setState({stockData: res.data[0].data["Time Series (Daily)"]});

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
    const {stockInfo, stockData, stockOpen, stockDate} = this.state  
    
    for (const property in stockData) {
    stockOpen.push(stockData[property]["1. open"])
    stockDate.push(property)

    }
    console.log (this.state.stockDate)
    
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
            {/* <div>{this.state.stockData["2022-04-20"].data["1. open"]}</div> */}
            {/* key= {this.state.stockInfo["1. Infomation"]} */}
            {/* {Object.keys(this.state.stockData).map(()) */}
            /* this.state.stockInfo.map(( )) */
            
            </div>





            <div className='plotGraph'>
                <Plot 
                    data={[
                        { 
                            x: this.state.stockDate,
                            y: this.state.stockOpen,
                            type: "scatter",
                            mode: "lines",
                            name: 'AAPL High',
                            line: {color: '#17BECF'},
                        },
                        // { 
                        //     x: [1, 2, 3, 4 , 5 ],
                        //     y: [2, 6, 3, 4 , 6 ],
                        //     type: "scatter",
                        //     mode: "lines",
                        //     name: 'AAPL low',
                        //     line: {color: '#7F7F7F'},
                        // },
                    ]}

                    layout={ {width: 1400, height: 480, title: `${this.state.stockInfo["2. Symbol"]} Stock`,
                    xaxis: {
                        autorange: true,
                        range: ['2022-04-01', '2022-12-31'],
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