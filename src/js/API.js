import axios from 'axios';
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const USER_KEY = '34317827-ccdab7647b739ba94e7a7be8e';
const PARAMETERS = '&image_type=photo&orientation=horizontal&safesearch=true';
export const HITS_PER_PAGE = 40;
export default async function fetchPictures(query, page) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}?key=${USER_KEY}&q=${query}${PARAMETERS}&per_page=${HITS_PER_PAGE}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
