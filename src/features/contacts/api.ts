import axios from 'axios';

export const BASE_URL = 'https://reqres.in/api/users/';

export const getAllContacts= (url = BASE_URL) => axios.get(url);