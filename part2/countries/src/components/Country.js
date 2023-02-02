const Country = ({country}) => {
    if (country === null) return

    return (
        <div>
        <h1>{country.name.common}</h1>
        <p>
            Capital: {country.capital}<br/>
            Area: {country.area}
        </p>
        <h2>Languages:</h2>
        <ul>
            {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default Country