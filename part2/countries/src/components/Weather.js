
const Weather = ({country, weather}) => {
    if (weather == null) return

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.current.temp} celcius</p>
            <p>
                {weather.current.weather.map(icon => {
                    const iconUrl = `http://openweathermap.org/img/wn/${icon.icon}@2x.png`
                    return <img key={icon.id} src={iconUrl} alt={icon.description} />
                    })
                }
            </p>
            <p>Wind {weather.current.wind_speed} m/s</p>
        </div>
    )
}

export default Weather