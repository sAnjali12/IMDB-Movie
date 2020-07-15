var User = require('./controller/movieData')
  	

// API Server Endpoints
exports.endpoints = [

  
  { method: 'GET', path: '/movie/{id}', config: User.getOne},
  { method: 'GET', path: '/movies', config: User.getAll}
  
];