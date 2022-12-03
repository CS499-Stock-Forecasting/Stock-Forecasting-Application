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
            stockPredict: [],
            stockHigh: '',
            stockLow: '',
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
        csvData.toString().split("\n").map((element) => {
            this.state.existingStocks.add(element.split(",")[0]);
            console.log(element.split(",")[0]);
        });
    };
      
    getStockData = (ticker) => {
        if (this.state.existingStocks.has(ticker)) {
            axios.get("/stockForecasting/" + ticker)
            //on success
            .then((response) => {
                this.setState({stockInfo: response.data.data["Meta Data"]});
                this.setState({stockData: response.data.data["Monthly Time Series"]});
            },
            //on failure call ML algorithm and post to database
            //TODO: if post is called on a ticker that exists in the database a duplicate will be made, PUT should be used instead
            (res) => {
                axios.post('/stockForecasting/', {ticker: ticker, data: {}})
                    .then(response => {
                        console.log(response.data)
                        this.setState({stockInfo: response.data.data["Meta Data"]});
                        this.setState({stockData: response.data.data["Monthly Time Series"]});
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
    // const {stockInfo, stockData, stockOpen, stockDate} = this.state  
    this.state.stockOpen = [];
    this.state.stockDate = [];
    this.state.stockHigh = '';
    this.state.stockLow = '';
    for (const property in this.state.stockData) {
    this.state.stockOpen.push(this.state.stockData[property]["1. open"])
    this.state.stockHigh = this.state.stockData[property]["2. high"]
    this.state.stockLow = this.state.stockData[property]["3. low"]
    this.state.stockDate.push(property)

    }
    
    this.state.stockPredict = [];
    let datearr = this.state.stockDate.filter(date =>  new Date('2022-11-30').getTime() < new Date(date).getTime())    
    console.log("date arr",datearr )

    for(let date of datearr){
        console.log(date )
        console.log(this.state.stockData[date])
        this.state.stockPredict.push(this.state.stockData[date]["1. open"])
    }
    // let currentVal =this.state.stockInfo["3. Last Refreshed"]["1. open"]
    // console.log(currentVal)

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
                    <h2 className='currentValue'>${this.state.stockOpen[6]}</h2>
                </div>

                <div className='lastRefereshedContainer'>
                    <div className='lastRefereshText'>Last Refereshed</div>
                    <h2 className='lastRefereshed'>Date {this.state.stockInfo["3. Last Refreshed"]}</h2>
                </div>

                <div className='lastRefereshedContainer'>
                    <div className='lastRefereshText'>High</div>
                    <h2 className='lastRefereshed'>${this.state.stockHigh}</h2>
                </div>
                <div className='lastRefereshedContainer'>
                    <div className='lastRefereshText'>Low</div>
                    <h2 className='lastRefereshed'>${this.state.stockLow}</h2>
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
                            name: this.state.stockInfo["2. Symbol"],
                            line: {color: '#17BECF'},
                        },
                        { 
                            x: datearr,
                            y: this.state.stockPredict,
                            type: "scatter",
                            mode: "lines",
                            name: `${this.state.stockInfo["2. Symbol"]} Predicted`,
                            line: {color: '#FFA500'},
                        },
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