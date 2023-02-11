import { useState, useEffect } from 'react'
import countriesService from './services/countriesService'
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'


const Message = ({message}) => message === null ? null : <div>{message}</div>

const App = () => {
  const [search, setSearch] = useState(null)
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(null)
  const [weather, setWeather] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => { 
    if (search === null) return
    countriesService
      .find(search)
      .then(foundCountries => {
        console.log('found countries ', foundCountries.length)

        setMessage(null)
        setCountry(null)
        setCountries(null)
        setWeather(null)

        if (foundCountries.length > 10) {
          setMessage('Too many matches (>10), please refine your search')
        } else if (foundCountries.length === 1 ) {
          showCountryAndWeather(foundCountries[0])
        } else {
          setCountries(foundCountries)
        }
      })
  },[search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const selectCountry = (event) => {
    showCountryAndWeather(countries.find(country => country.cca2 === event.target.value))
  }

  /*
  When only one country is found, or one is selected manually,
  also search weather info for it
  */
  const showCountryAndWeather = (countryToShow) => {
    console.log(`Showing country ${countryToShow.name.common}`)
    setCountry(countryToShow)

    countriesService
      .getWeather(countryToShow.latlng[0], countryToShow.latlng[1])
      .then(foundWeather => {
        console.log(`found weather for ${foundWeather.lat},${foundWeather.lon}, ${foundWeather.timezone}`)
        setWeather(foundWeather)
      })
  }

  return (
    <div>
      Find countries <input onChange={handleSearchChange} />
      <Message message={message} />
      <Countries countries={countries} selectCountry={selectCountry} />
      <Country country={country} />
      <Weather country={country} weather={weather} />
    </div>
  )
}

export default App