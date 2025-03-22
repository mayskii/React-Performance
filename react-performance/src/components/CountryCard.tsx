import { Country } from "../hooks/useFetchCountries";
import { memo } from "react";

interface Props {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (countryName: string) => void;
}

const CountryCard = memo(({ country, isVisited, onToggleVisited }: Props) => {
  return (
    <div className={`country-card ${isVisited ? "visited" : ""}`}>
      <img src={country.flags.svg} alt={country.name.common} width="50" />
      <h3>{country.name.common}</h3>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <button onClick={() => onToggleVisited(country.name.common)}>
        {isVisited ? "Unmark as visited" : "Mark as visited"}
      </button>
    </div>
  );
});

export default CountryCard;