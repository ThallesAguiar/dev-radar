const {Router} = require('express');
const UserController = require('./app/controller/UserController');
const SearchController = require('./app/controller/SearchController');

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/search', SearchController.index);

module.exports = routes;