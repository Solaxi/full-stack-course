const Countries = ({countries, selectCountry}) => {
    if (countries === null || countries.length === 1 ) return
  
    return (
      <p>
        {countries.map(country => 
            <CountryName key={country.cca2} country={country} selectCountry={selectCountry} />)}
      </p>
    )
}
  
const CountryName = ({country, selectCountry}) => {
    return (
        <>{country.name.common} 
        <button onClick={selectCountry} value={country.cca2}>Show</button>
        <br/>
        </>
    )
}

export default Countries