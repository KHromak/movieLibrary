// Send query from frontend
import axios from 'axios';


export default {

  getAll: async () => {
    let res = await axios.get(`/api/films`);
    return res.data || [];
  },

  addFilm: async (film) => {
    let add = await axios.post(`/api/films`, film);
  },

  // deleteFilm: async (film) => {
  //   let res = await axios.delete(`/api/films`, { params: { id: film } });
  // },

  deleteFilm: async (id) => {
    let res = await axios.delete(`/api/films/${id}`);
  },

  sortFilms: async () => {
    let allFilms = await axios.get(`/api/films`);
    let sortedFilms = allFilms.data.sort((a, b) => a.title.localeCompare(b.title));
    return sortedFilms;
  },

  findFilmByName: async (params) => {
    let findedFilm = await axios.get(`api/film/find`, { params });
    return findedFilm.data || [];
  },

  // uploadFile: async (formData) => {
  //   console.log(formData, "film gotov k otpravke")
  //   try{
  //     const res = await axios.post('/api/upload', formData, {
  //       headers: {
  //         'Content-Type': 'text/plain'
  //       },
  //     });

  //     const { fileName, filePath } = res.data;
  //     console.log(res.data);
  //     console.log(JSON.parse(res.data));

  //     return fileName;

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

}