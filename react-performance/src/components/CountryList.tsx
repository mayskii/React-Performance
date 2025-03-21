import { useFetchCountries  } from '../hooks/useFetchCountries';
import CountryFilters from './CountryFilters';
import { useState, useMemo } from 'react';
import "../global.css";

const CountryList = () => {
  const { countries, loading, error } = useFetchCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((country) =>
        selectedRegion ? country.region === selectedRegion : true
      )
      .sort((a, b) => {
        if (!sortCriteria) return 0;
        if (sortCriteria === 'name')
          return a.name.common.localeCompare(b.name.common);
        if (sortCriteria === 'name-desc')
          return b.name.common.localeCompare(a.name.common);
        if (sortCriteria === 'population') return a.population - b.population;
        if (sortCriteria === 'population-desc')
          return b.population - a.population;
        return 0;
      });
  }, [countries, searchQuery, selectedRegion, sortCriteria]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <CountryFilters
        onSearch={setSearchQuery}
        onFilter={setSelectedRegion}
        onSort={setSortCriteria}
      />
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="country-card">
            <img src={country.flags.svg} alt={country.name.common} width="50" />
            <h3>{country.name.common}</h3>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
