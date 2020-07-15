'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    title: String,
    year: String,
    released: String,
    genre: String,
    director: String,
    awards: String,
    imdbID: String,
    type: String,
    ratings: [{
        Source: String,
        Value: String
    }]
});

const movieModle = mongoose.model('movies', UserSchema);

module.exports = {
    movieModle
};




