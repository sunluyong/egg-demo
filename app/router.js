'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const cost = app.middleware.cost({ header: 'egg-cost' });
  // user api
  app.get('/api/user/list', 'api.user.list');
  app.get('/api/user/:id', 'api.user.get');
  app.post('/api/user', 'api.user.create');
  app.put('/api/user/:id', 'api.user.edit');
  app.delete('/api/user/:id', 'api.user.delete');

  // user page
  app.get('/user/create', 'user.create');
  app.get('/user/edit/:id', 'user.edit');
  app.get('/user/list', 'user.list');

  app.get('/api/test', 'api.test.index');

  // app.get('/', cost, 'home.index');
  app.get('/', 'home.index');
};
