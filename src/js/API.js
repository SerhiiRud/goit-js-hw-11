import axios from 'axios';
import Notiflix from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const USER_KEY = '34317827-ccdab7647b739ba94e7a7be8e';
const PARAMETERS = '&image_type=photo&orientation=horizontal&safesearch=true';
const HITS_PER_PAGE = 40;

export default function fetchPictures(query, page) {
  return axios
    .get(
      `${BASE_URL}?key=${USER_KEY}&q=${query}${PARAMETERS}&per_page=${HITS_PER_PAGE}&page=${page}`
    )
    .then(({ data }) => data);
  // return fetch(
  //   `${BASE_URL}?key=${USER_KEY}&q=${query}${PARAMETERS}&per_page=${HITS_PER_PAGE}&page=${page}`
  // )
  //   .then(response => response.json())
  //   .catch(error => console.log(error.name));
}

// .then(response => {
//     if (response.ok) {
//       console.log(1, response.json());
//       return response.json();
//     } else {
//       console.log('error');
//     }
//   });
