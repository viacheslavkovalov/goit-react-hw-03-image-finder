import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdImageSearch } from 'react-icons/md';
import {
  StyledSearchbar,
  StyledForm,
  StyledFormButton,
  StyledFormButtonLabel,
  StyledFormInput,
} from './StyledSearchbar';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({
      searchQuery: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('Please text desired');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <StyledSearchbar>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledFormButton type="submit">
            <StyledFormButtonLabel>
              <MdImageSearch style={{ width: 40, height: 40 }} />
            </StyledFormButtonLabel>
          </StyledFormButton>
          <StyledFormInput
            value={this.state.searchQuery}
            type="text"
            // autoComplete="off"
            // autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
          />
        </StyledForm>
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
