import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import * as API from '../services/api';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [imageList, setImageList] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getImages(query, page, perPage);
  }, [query, page, perPage]);

  const getImages = async (query, page, perPage) => {
    if (!query) return;

    setIsLoading(true);

    try {
      const { hits, totalHits } = await API.getImages(query, page, perPage);

      const limitPage = page < Math.ceil(totalHits / perPage);

      setImageList(prevState => [...prevState, ...hits]);
      setIsLoadMore(limitPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = searchValue => {
    setQuery(searchValue);
    setImageList([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleModalOpen = id => {
    const { largeImageURL, tags } = imageList.find(image => image.id === id);

    setLargeImage(largeImageURL);
    setLargeImageAlt(tags);
  };

  const handleModalClose = () => {
    setLargeImage('');
    setLargeImageAlt('');
  };

  const { App, Message } = css;

  return (
    <div className={App}>
      <Searchbar onSubmit={handleSubmitForm} />
      {imageList.length === 0 && !error && !isLoading && (
        <p className={Message}>Sorry. There are no images ... 😭</p>
      )}
      {error && <p className={Message}> ❌ Something went wrong - {error}</p>}

      <ImageGallery imageList={imageList} openModal={handleModalOpen} />
      {isLoading && <Loader />}
      {isLoadMore && !isLoading && <Button loadMore={handleLoadMore} />}
      {largeImage && (
        <Modal
          largeImage={largeImage}
          largeImageAlt={largeImageAlt}
          onClose={handleModalClose}
        />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};
