'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const user = await ctx.service.home.getUser();

    await this.ctx.render('home', {
      title: 'Egg.js demo homepage',
      user,
    });
  }
}

module.exports = HomeController;
