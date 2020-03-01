const mongoose = require('mongoose');
const Films = mongoose.model('Films');
const filmsParser = require('../filmsParser');

module.exports = (app) => {

  // Get all
  app.get(`/api/films`, async (req, res) => {
    let films = await Films.find();
    return res.status(200).send(films);
  });

  // Add film
  app.post(`/api/films`, async (req, res) => {
    let films = await Films.create(req.body);
    return res.status(201).json({ msg: 'фильм сохранен в базу данных' })
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
    let findedFilm = await Films.find(req.query);
    res.status(200).send(findedFilm);
  });

  //Upload
  app.post(`/api/upload`, async (req, res) => {
    if (!req.files) {
      return res.status(400).json({ msg: 'файл не загрузился, код ошибки 400' })
    }
    try {
      let file = req.files.file;
      let films = filmsParser(file);
      for (let film of films) {
        await Films.create(film);
      }
      return res.status(200).json({ msg: 'файл загружен на сервер' })
    } catch (error) {
      return res.status(400).json({ msg: 'файл не загрузился, код ошибки 400' })
    }
  });
}