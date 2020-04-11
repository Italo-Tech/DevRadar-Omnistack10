const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// DevController
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs/:id', DevController.destroy);

// SearchController
routes.get('/search', SearchController.index);
module.exports = routes;