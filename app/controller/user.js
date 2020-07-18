'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async create() {
    await this.ctx.render('user/create', {
      csrf: this.ctx.csrf,
    });
  }

  async edit() {
    const { id } = this.ctx.params;
    await this.ctx.render('user/edit', {
      userId: id,
      csrf: this.ctx.csrf,
    });
  }

  async list() {
    await this.ctx.render('user/list');
  }
}

module.exports = HomeController;
