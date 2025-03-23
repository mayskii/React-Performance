import { useState, useCallback } from 'react';

interface Props {
  onSearch: (query: string) => void;
  onFilter: (region: string) => void;
  onSort: (criteria: string) => void;
}

const CountryFilters = ({ onSearch, onFilter, onSort }: Props) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [sort, setSort] = useState('');

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  }, [onSearch]);

  const handleFilter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
    onFilter(selectedRegion);
  }, [onFilter]);

  const handleSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    onSort(selectedSort);
  }, [onSort]);


  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
      />

      <select
        value={region}
        onChange={handleFilter}
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Australia and Oceania</option>
      </select>

      <select
        value={sort}
        onChange={handleSort}
      >
        <option value="">Sort By</option>
        <option value="name">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="population">Population (Low-High)</option>
        <option value="population-desc">Population (High-Low)</option>
      </select>
    </div>
  );
};

export default CountryFilters;
