const Joi = require('joi');
const movieModle = require('../modle/movieDb').movieModle;
const fetch = require('node-fetch');


  // fatch data..
const omdbMovie = async (imdbId, callback) => {
  let hostMovieData  = await fetch(`https://www.omdbapi.com/?apikey=7c1f340b&i=${imdbId}`)
    return await hostMovieData.json();
    
}

exports.getOne = {
  
  handler: async function (request, reply) {
          let imdbId = request.params.id
          try{
            const movieData = await movieModle.findOne({imdbID: imdbId});
            if (movieData) {
                return movieData;
            }
            let omdbMovieData = await omdbMovie(imdbId);
            let data = {
                title: omdbMovieData["Title"],
                year: omdbMovieData["Year"],
                released: omdbMovieData["Released"],
                genre: omdbMovieData["Genre"],
                director: omdbMovieData["Director"],
                awards: omdbMovieData["Awards"],
                imdbID: omdbMovieData["imdbID"],
                type: omdbMovieData["Type"],
                ratings: omdbMovieData["Ratings"]
            };

            const newMovieData = new movieModle(data);
            newMovieData.save();

            return newMovieData.pretty()
        
      } catch (error) {
        console.log(error)
        return reply.response(error).code(500);
      }

    }
}


exports.getAll = {
  handler: async function (request, reply) {
    const pageOptions = {
      limit: parseInt(request.query.limit, 10) || 10
  }
   try {
    const movieData = await movieModle.find({}, {"_id":0,"title":1, "year":1, "genre":1, "imdbID":1}).limit(pageOptions.limit);
    return movieData
   } catch (error){
     console.log(error)
   }
  }
};       

