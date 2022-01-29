import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import apiService from './services/apiService';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export default class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    largeImageURL: '',
    page: '',
    error: null,
    isLoading: false,
    showModal: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      error: null,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.searchImages();
    }
  }

  searchImages = async () => {
    const { searchQuery, page } = this.state;
    this.toggleLoader();
    try {
      const response = await apiService(searchQuery, page);
      this.setState(({ images, page }) => ({
        images: [...images, ...response],
        page: page + 1,
      }));
      if (response.length === 0) {
        this.setState({ error: `No results for ${searchQuery}!` });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong. Try again.' });
    } finally {
      this.toggleLoader();
    }
  };
  onLoadMore = () => {
    this.searchImages();
    this.scrollPage();
  };
  onOpenModal = event => {
    this.setState({ largeImageURL: event.target.dataset.source });
    this.toggleModal();
  };
  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 150,
        behavior: 'smooth',
      });
    }, 800);
  };

  render() {
    const { images, largeImageURL, isLoading, showModal, error } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        {error && <ErrorDisplay texterror={error} />}
        {images.length > 0 && !error && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {isLoading && <Loader />}
        {!isLoading && images.length >= 12 && !error && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {showModal && (
          <Modal
            onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL}
          />
        )}
        <ToastContainer autoClose={2000} position="top-right" />
      </StyledApp>
    );
  }
}
