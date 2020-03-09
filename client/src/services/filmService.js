// Send query from client
import axios from 'axios';

export default {

  getAll: async (params) => {
    let res = await axios.get(`/api/films`, { params });
    return res.data || [];
  },

  addFilm: async (film) => {
    console.log(film, 'find film film film')
    let res = await axios.post(`/api/films`, film);
    console.log(res, 'find message msg red')
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
    let foundFilm = await axios.get(`api/film/find`, { params });
    return foundFilm.data || [];
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