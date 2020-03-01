// template

const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title: String,
    year: String,
    format: String,
    stars: Array
})

mongoose.model('Films', productSchema);