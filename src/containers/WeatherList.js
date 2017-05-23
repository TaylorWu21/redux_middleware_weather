import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMap from '../components/GoogleMap';
import Chart from '../components/Chart';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => (temp - 273 ) * (1.8) + 32);
    const pressures = cityData.list.map( weather => weather.main.pressure);
    const humidities = cityData.list.map( weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return(
      <tr key={name}>
        <td><GoogleMap lat={lat} lon={lon} /></td>
        <td><Chart data={temps} color='orange' units="F" /></td>
        <td><Chart data={pressures} color='red' units="hPa" /></td>
        <td><Chart data={humidities} color='blue' units="%" /></td>
      </tr>
    )
  }

  render() {
    return(
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>City</th>
            <th>Tempature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          { this.props.weather.map( this.renderWeather ) }
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

export default connect(mapStateToProps)(WeatherList);
