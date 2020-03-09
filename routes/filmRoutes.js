const mongoose = require('mongoose');
const Films = mongoose.model('Films');
const filmsParser = require('../filmsParser/filmsParser');
const uploadsValidator = require('../uploadsValidator/uploadsValidator')
const redAlertColor = "alert alert-danger alert-dismissible fade show";
const blueAlertColor = "alert alert-info alert-dismissible fade show";


module.exports = (app) => {

  // Get all
  app.get(`/api/films`, async (req, res) => {

    let totalPosts = await Films.count({}, function (err, count) {
       return count;
    })

    let size = parseInt(req.query.size);
    let page = parseInt(req.query.page);
    let totalCount = parseInt(totalPosts / size);
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

      let filmes = res.status(200).send({
        result,
        totalCount
    });
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

  // Find by star
  app.get(`/api/film/find/stars`, async (req, res) => {
    let starsRegExp = new RegExp(req.query.stars, 'i');
    let findedFilms = await Films.find({stars: { $regex: starsRegExp }});
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
      return res.status(400).json({ msg: 'File upload error (400)', color:  redAlertColor})
    }
    
    let isValid = uploadsValidator(req.files.file);
    if (isValid){
      try {
        let file = req.files.file;
        let films = filmsParser(file);
        for (let film of films) {
          await Films.create(film);
        }
        return res.status(200).json({ msg: 'Library uploaded on server' , color:  blueAlertColor})
      } catch (error) {
        return res.status(400).json({ msg: 'File upload error (400)', color:  redAlertColor })
      }
    }
    else {
      return res.status(400).json({ msg: 'Please upload valid file', color:  redAlertColor})
    }
  });
}