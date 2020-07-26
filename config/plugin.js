'use strict';

const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  handlebars: {
    enable: true,
    package: 'egg-view-handlebars',
  },
  mysql: {
    enable: false,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  pluginDemo: {
    enable: true,
    path: path.join(__dirname, '../../egg-plugin-demo'),
  },
};
