const mongoose = require('mongoose');
const Films = mongoose.model('Films');
// const express = require('express');
// const fs = require('fs');

module.exports = (app) => {

  // Get all
  app.get(`/api/films`, async (req, res) => {
    let films = await Films.find();
    return res.status(200).send(films);
  });

  // Add film
  app.post(`/api/films`, async (req, res) => {
    let films = await Films.create(req.body);
    return res.status(201).send({
      error: false,
      films
    })
  })

  // Delete
  // app.delete(`/api/films`, async (req, res) => {
  //   let films = await Films.findByIdAndDelete(req.query.id);
  //   return res.status(202).send({
  //     error: false,
  //     films
  //   })
  // })

  app.delete(`/api/films/:id`, async (req, res) => {
    let films = await Films.findByIdAndDelete(req.params.id);
    return res.status(202).send({
      error: false,
      films
    })
  })

  // Find
  app.get(`/api/film/find`, async (req, res) => {
    let findedFilm = await Films.find(req.query);
    res.status(200).send(findedFilm);
  })

  // Upload



}