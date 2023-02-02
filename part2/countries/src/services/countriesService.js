import axios from 'axios'
const weather_api_key = process.env.REACT_APP_API_KEY
const baseCountryUrl = 'https://restcountries.com/v3.1/name/'
const baseWeatherUrl = `https://api.openweathermap.org/data/3.0/onecall?units=metric&appid=${weather_api_key}`

const find = search => axios.get(`${baseCountryUrl}${search}`).then(response => response.data)

const getWeather = (lat, long) => {
    const weatherUrl = `${baseWeatherUrl}&lat=${lat}&lon=${long}`
    return axios.get(weatherUrl).then(response => response.data)
}

export default { find, getWeather }