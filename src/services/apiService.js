import axios from 'axios';

const KEY = '24120702-c8c387165c949bc99fec4e736';
const BASE_URL = 'https://pixabay.com/api';

const apiService = async (searchQuery, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return data.hits;
};
export default apiService;
