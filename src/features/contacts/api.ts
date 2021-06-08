import axios from 'axios';
import { IContact } from './contactsSlice';

export const BASE_URL = 'https://reqres.in/api/users/';

export const getAllContacts = (url = BASE_URL) => axios.get(url);
export const postContact = (contact: any) => axios.post(BASE_URL, contact);