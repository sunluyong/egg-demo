'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // user api
  app.get('/api/user/:id', 'api.user.get');

  app.get('/', 'home.index');
};
