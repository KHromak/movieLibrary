// Send query from client
import axios from 'axios';

export default {

  getAll: async (params) => {
    let res = await axios.get(`/api/films`, { params });
    return res.data || [];
  },

  addFilm: async (film) => {
    let res = await axios.post(`/api/films`, film);
    return res;
  },

  deleteFilm: async (id) => {
    await axios.delete(`/api/films/${id}`);
  },

  sortFilms: async (params) => {
    let allFilms = await axios.get(`/api/films`, { params });
    let sortedFilms = allFilms.data.result.sort((a, b) => a.title.localeCompare(b.title));
    return sortedFilms;
  },

  findFilm: async (params) => {
    let findedFilm = await axios.get(`api/film/find`, { params });
    return findedFilm.data || [];
  },

  findFilmByStar: async (params) => {
    let findedFilm = await axios.get(`api/film/find/stars`, { params });
    return findedFilm.data || [];
  },

  uploadFile: async (params) => {
    let res = await axios.post('/api/upload', params.formData, {
      headers: {
        'Content-Type': 'text/plain'
      },
      onUploadProgress: params.onUploadProgress
    });    
    return res;
  }
}