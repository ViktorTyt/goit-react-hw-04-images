import { Component } from 'react';
import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import * as API from '../services/api';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    perPage: 12,
    imageList: [],
    largeImage: '',
    largeImageAlt: '',
    isLoading: false,
    isLoadMore: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, perPage, query } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.getImages(query, page, perPage);
    }
  }

  getImages = async (query, page, perPage) => {
    if (!query) return;

    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await API.getImages(query, page, perPage);

      const limitPage = page < Math.ceil(totalHits / perPage);

      this.setState(prevState => ({
        imageList: [...prevState.imageList, ...hits],
        isLoadMore: limitPage,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmitForm = searchValue => {
    this.setState({
      query: searchValue,
      imageList: [],
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalOpen = id => {
    const { largeImageURL, tags } = this.state.imageList.find(
      image => image.id === id
    );

    this.setState({
      largeImage: largeImageURL,
      largeImageAlt: tags,
    });
  };

  handleModalClose = () => {
    this.setState({
      largeImage: '',
      largeImageAlt: '',
    });
  };

  render() {
    const {
      isLoading,
      imageList,
      largeImage,
      largeImageAlt,
      isLoadMore,
      error,
    } = this.state;
    const { App, Message } = css;

    return (
      <div className={App}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        {imageList.length === 0 && !error && !isLoading && (
          <p className={Message}>Sorry. There are no images ... 😭</p>
        )}
        {error && <p className={Message}> ❌ Something went wrong - {error}</p>}

        <ImageGallery imageList={imageList} openModal={this.handleModalOpen} />
        {isLoading && <Loader />}
        {isLoadMore && !isLoading && <Button loadMore={this.handleLoadMore} />}
        {largeImage && (
          <Modal
            largeImage={largeImage}
            largeImageAlt={largeImageAlt}
            onClose={this.handleModalClose}
          />
        )}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
}
