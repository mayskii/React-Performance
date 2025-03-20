import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  onFilter: (region: string) => void;
  onSort: (criteria: string) => void;
}

const CountryFilters = ({ onSearch, onFilter, onSort }: Props) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [sort, setSort] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
      />

      <select
        value={region}
        onChange={(e) => {
          setRegion(e.target.value);
          onFilter(e.target.value);
        }}
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Australia and Oceania</option>
      </select>

      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          onSort(e.target.value);
        }}
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
