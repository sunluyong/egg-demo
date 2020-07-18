'use strict';

const Service = require('egg').Service;

class User extends Service {
  async get(id) {
    const user = await this.app.mysql.get('user', { id });
    return user;
  }
}

module.exports = User;
