const mongoose = require('mongoose');
const Films = mongoose.model('Films');
const filmsParser = require('../filmsParser/filmsParser');

module.exports = (app) => {

  // Get all
  app.get(`/api/films`, async (req, res) => {
    let size = parseInt(req.query.size);
    let page = parseInt(req.query.page);
    let skip = size * page;

    try {
      let films = await Films
        .find()
        .limit(size)
        .skip(skip);

      let result = films.map((film, index) => {
        return {
          ...film,
          id: film.id,
          year: film.year,
          title: film.title,
          stars: film.stars,
          index: index + skip,
          format: film.format
        }
      });

      let filmes = res.status(200).send(result);
      return filmes;
    }
    catch (e) {
      console.log(e);
    }
  });

  // Add film
  app.post(`/api/films`, async (req, res) => {
    let films = await Films.create(req.body);
    return res.status(201).json({ msg: 'Movie added to the database' })
  });

  // Delete
  app.delete(`/api/films/:id`, async (req, res) => {
    let films = await Films.findByIdAndDelete(req.params.id);
    return res.status(202).send({
      error: false,
      films
    })
  });

  // Find
  app.get(`/api/film/find`, async (req, res) => {

    let findedFilms = await Films.find(req.query);
    let result = findedFilms.map((film, index) => {
      return {
        ...film,
        id: film.id,
        year: film.year,
        title: film.title,
        stars: film.stars,
        index: index,
        format: film.format
      }
    });

    res.status(200).send(result);
  });

  //Upload
  app.post(`/api/upload`, async (req, res) => {
    if (!req.files) {
      return res.status(400).json({ msg: 'File upload error (400)' })
    }
    try {
      let file = req.files.file;
      let films = filmsParser(file);
      for (let film of films) {
        await Films.create(film);
      }
      return res.status(200).json({ msg: 'Library uploaded on server' })
    } catch (error) {
      return res.status(400).json({ msg: 'File upload error (400)' })
    }
  });
}