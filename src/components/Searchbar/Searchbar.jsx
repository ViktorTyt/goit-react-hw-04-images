import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChangeSearch = searchValue => {
    this.setState({
      searchValue,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { searchValue } = this.state;

    if (searchValue.trim() === '') {
      toast.error('Please, enter image name');
      return;
    }
    this.props.onSubmit(searchValue.trim());

    this.reset();
  };

  reset = () => {
    return this.setState({
      searchValue: '',
    });
  };

  render() {
    const {
      SearchBar,
      SearchForm,
      SearchFormButton,
      SearchFormButtonLabel,
      SearchFormInput,
    } = css;

    return (
      <header className={SearchBar}>
        <form className={SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={SearchFormButton}>
            <BsSearch />
            <span className={SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={SearchFormInput}
            type="text"
            name="search"
            value={this.state.searchValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={({ target: { value } }) =>
              this.handleChangeSearch(value.toLowerCase())
            }
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
