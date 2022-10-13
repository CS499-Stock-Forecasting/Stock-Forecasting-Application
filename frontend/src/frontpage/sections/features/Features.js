import React from 'react'
import './Features.css'
import advanceChart from './AvgTemp Chart.png'
import TsF from './TimeseriesForecasting.png'
import PersonalImg from './PersonalAccount.png'
function Features() {
  return (
    <div className='featuresContainter' id='Features'>

        <div className='advanceCharts'>
            <div className='advanceChartsImg' >
            <img src={advanceChart} alt= "Chart" height={500} width={700}></img>
            </div>
            <div className='advanceChartsText'>
                <h1>Advanced Charts</h1>
                <div>is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of popularised in the 1960s with the release of Letraset 
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
        </div>

        <div className='timeSeriesForecasting'>

        <div className='timeSeriesForecastingImg' >
            <img src={TsF} alt= "Chart" height={400} width={700}></img>
            </div>
            <div className='timeSeriesForecastingText'>
                <h1>Time Series Forecasting</h1>
                <div>is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of popularised in the 1960s with the release of Letraset 
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>

        </div>

        <div className='personalizedAccounts'>
                <div className='personalizedAccountsText'>
                    <h1 className='personalizedAccountsTextH1'>Personalized Accounts</h1>
                    <div>is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of popularised in the 1960s with the release of Letraset 
                        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                        like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
                <img className='personalizedAccountsImg' src={PersonalImg} alt= "Chart" height={300} width={600}></img>
        </div>
        Features
        
    </div>
  )
}

export default Features