import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = 'key=27615297-cbddad2d0ddf2be561a52608f';

export const getImages = async (query, page, perPage) => {
  const { data } = await axios(
    `${BASE_URL}/?${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  );

  return data;
};
