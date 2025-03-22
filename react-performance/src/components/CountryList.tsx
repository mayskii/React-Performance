import { useFetchCountries  } from '../hooks/useFetchCountries';
import CountryFilters from './CountryFilters';
import CountryCard from "./CountryCard";
import { useState, useMemo, useCallback } from 'react';
import "../global.css";

const CountryList = () => {
  const { countries, loading, error } = useFetchCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilter = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleSort = useCallback((criteria: string) => {
    setSortCriteria(criteria);
  }, []);

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
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />
      <div className={filteredCountries.length === 1 ? "single-country" : "countries"}>
        {filteredCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
