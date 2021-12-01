import { useState } from "react"
import ExchangeRate from "./ExchangeRate"
import axios from "axios"

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'EUR', 'XMR']
    const [selectedPrimaryCurrency, setSelectPrimaryCurrency] = useState('BTC')
    const [selectedSecondaryCurrency, setSelectSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [result, setResult] = useState(0)

    const doConvert = () => {

        const options = {
          method: 'GET',
          url: 'https://alpha-vantage.p.rapidapi.com/query',
          params: {from_currency: selectedPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: selectedSecondaryCurrency},
          headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_API_KEY
          }
        };
        
        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        }).catch((error) => {
            console.error(error);
        });        
    }

    return (
        <div className="currency-converter">
           <h2>Currency Converter</h2>
            <div className="input-box">
                <table>
                    <body>
                        <tr>
                            <td>Primary Currency :</td>
                            <td>
                                <input
                                        type="number"
                                        name="currency-amount-1"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={selectedPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                    onChange={(e) => setSelectPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map( (currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Currency :</td>
                            <td>
                                <input
                                        type="number"
                                        name="currency-amount-2"
                                        value={result}
                                        disabled={true}
                                />
                            </td>
                            <td>
                                <select
                                    value={selectedSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(e) => setSelectSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map( (currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>                        
                    </body>
                </table>
                <button id="convert-btn" onClick={doConvert}>Convert</button>
            </div>

            <ExchangeRate 
                exchangeRate = {exchangeRate}
                primaryCurrency = {selectedPrimaryCurrency}
                secondaryCurrency = {selectedSecondaryCurrency}
            />
        </div>
    )
}

export default CurrencyConverter