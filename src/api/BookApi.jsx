// src/api/BookApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://openlibrary.org/search.json',
});

export const getBooks = (searchTerm) => {
    return api.get(``, { params: { title: searchTerm } });
};

// console.log(getBooks());
