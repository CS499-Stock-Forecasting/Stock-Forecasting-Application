import React, { Component } from 'react'
import HeaderApp from '../header/HeaderApp'
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
            existingStocks: new Set()
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount() {
        // get a list of all the existing stocks to cross reference user searches
        axios.get('https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=RO71SZX5F72HYPEQ')
        .then(response => {
            this.parseCsv(response.data);
        })
    }

    parseCsv = (csvData) => {
        csvData.split("\n").map((element) => {
            this.state.existingStocks.add(element.split(",")[0]);
        });
    };
      
    getStockData = (ticker) => {
        if (this.state.existingStocks.has(ticker)) {
            axios.get("/stockForecasting/" + ticker)
            //on success
            .then((res) => {
                this.setState({stockInfo: res.data.data["Meta Data"]});
                this.setState({stockData: res.data.data["Time Series (Daily)"]});
            },
            //on failure call ML algorithm and post to database
            //TODO: if post is called on a ticker that exists in the database a duplicate will be made, PUT should be used instead
            (res) => {
                axios.post('/stockForecasting/', {ticker: ticker, data: {}})
                    .then(response => {console.log(response.data);
                    });    
            });
            
        } else {
            alert("Stock doesnt exist");
        }
      };

    handleChange(event) {
        this.setState({value: event.target.value});
        }
    
    handleSubmit(event) {
        this.getStockData(this.state.value.toUpperCase());
        event.preventDefault();
    }    
  
    render() {
    const {stockInfo, stockData, stockOpen, stockDate} = this.state  
    
    for (const property in stockData) {
    stockOpen.push(stockData[property]["1. open"])
    stockDate.push(property)

    }
    console.log (this.state.stockDate)
    
    return (
        <div>
            <HeaderApp/>

            <div className='applicationTop'>
                <div className='tickerText' >
                    <h1>${this.state.stockInfo["2. Symbol"]}</h1>
                </div>

                <div className='applicationForm'>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Ticker:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    
                    <input type="submit" value="Submit" className="btn btn-secondary mr-2"/>
                </form>

                </div>
            </div>
            

            <div className="applicationCard" style={{borderRadius: '15px'}}>
                
                <div className='currenValueContainer'>
                    Current Value
                    <h2 className='currentValue'>${this.state.stockOpen[0]}</h2>
                </div>

                <div className='lastRefereshedContainer'>
                    <div className='lastRefereshText'>Last Refereshed</div>
                    <h2 className='lastRefereshed'>Date {this.state.stockInfo["3. Last Refreshed"]}</h2>
                </div>

                <div className='lastRefereshedContainer'>
                    <div className='lastRefereshText'>High</div>
                    <h2 className='lastRefereshed'>${this.state.stockOpen[2]}</h2>
                </div>
                <div className='lastRefereshedContainer'>
                    <div className='lastRefereshText'>Low</div>
                    <h2 className='lastRefereshed'>${this.state.stockOpen[3]}</h2>
                </div>



            </div>



            {/* <ui>{this.state.stockInfo.map(stockInfo => <li>{stockInfo.symbol}</li>)} </ui>   */}
            <div>
            {/* <div >{this.state.stockInfo["2. Symbol"]}</div> */}
            {/* <div>{this.state.stockData["2022-04-20"].data["1. open"]}</div> */}
            {/* key= {this.state.stockInfo["1. Infomation"]} */}
            {/* {Object.keys(this.state.stockData).map(()) */}
            
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