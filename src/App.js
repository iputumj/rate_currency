import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currency: [],
      filteredRates: [],
      rates: [],
    };
  }

  componentDidMount() {
    const baseUrl =
      'https://api.currencyfreaks.com/latest?apikey=447fd2eca99c4e77bdba23430647623f';

    axios
      .get(baseUrl)
      .then((response) => {
        const rateCurrency = response.data.rates;

        if (rateCurrency) {
          const converted = Object.keys(rateCurrency).map((key) => [
            key,
            rateCurrency[key],
          ]);
          this.setState({ currency: converted });
        }

        // if (this.state.currency.length !== 0) {
        //   this.state.currency.map((val) => {
        //     // console.log((5 / 100) * val[1]);
        //     // this.setState({rates: val})
        //   });
        // }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  render() {
    return (
      <div className='app'>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {this.state.currency
              ? this.state.currency.map((val, key) => {
                  const rates = (5 / 100) * val[1];
                  const exchangeRates = parseFloat(val[1]);
                  return (
                    <tr key={key}>
                      <td>{val[0]}</td>
                      <td>{exchangeRates + rates}</td>
                      <td>{val[1]}</td>
                      <td>{exchangeRates - rates}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}
