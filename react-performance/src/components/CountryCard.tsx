import { Country } from "../hooks/useFetchCountries";
import { memo } from "react";

interface Props {
  country: Country;
}

const CountryCard = memo(({ country }: Props) => {
  return (
    <div className="country-card">
      <img src={country.flags.svg} alt={country.name.common} width="50" />
      <h3>{country.name.common}</h3>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
    </div>
  );
});

export default CountryCard;