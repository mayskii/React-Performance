import { useFetchCountries } from "../hooks/useFetchCountries";

const CountryList = () => {
  const { countries, loading, error } = useFetchCountries();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common} className="country-card">
          <img src={country.flags.svg} alt={country.name.common} width="50" />
          <h3>{country.name.common}</h3>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryList;