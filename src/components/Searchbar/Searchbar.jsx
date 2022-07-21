import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearch = searchValue => setSearchValue(searchValue);

  const handleFormSubmit = e => {
    e.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Please, enter image name');
      return;
    }
    onSubmit(searchValue.trim());

    setSearchValue('');
  };

  const {
    SearchBar,
    SearchForm,
    SearchFormButton,
    SearchFormButtonLabel,
    SearchFormInput,
  } = css;

  return (
    <header className={SearchBar}>
      <form className={SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={SearchFormButton}>
          <BsSearch />
          <span className={SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={SearchFormInput}
          type="text"
          name="search"
          value={searchValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={({ target: { value } }) =>
            handleChangeSearch(value.toLowerCase())
          }
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
