// Send query from client
import axios from 'axios';

export default {

  getAll: async () => {
    let res = await axios.get(`/api/films`);
    return res.data || [];
  },

  addFilm: async (film) => {
    await axios.post(`/api/films`, film);
  },

  deleteFilm: async (id) => {
    await axios.delete(`/api/films/${id}`);
  },

  sortFilms: async () => {
    let allFilms = await axios.get(`/api/films`);
    let sortedFilms = allFilms.data.sort((a, b) => a.title.localeCompare(b.title));
    return sortedFilms;
  },

  findFilm: async (params) => {
    let findedFilm = await axios.get(`api/film/find`, { params });
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