'use strict';

const Controller = require('egg').Controller;

class Test extends Controller {
  async index() {

    this.ctx.body = new this.ctx.helper.ResultDto({
      text: 'ok',
    });
  }
}

module.exports = Test;
