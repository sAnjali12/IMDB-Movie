var Hapi = require('hapi'),
  Routes = require('./end_points'),
  Mongoose = require('mongoose')



    Mongoose.connect("mongodb://localhost:27017/IMDB-DATA");  
    var db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
    console.log("Connection with database succeeded.");
    }); 

const server = new Hapi.server({port:3000})

server.route(Routes.endpoints);

server.start(function () {
  console.log('Server started ', server.info.uri);
});

