'use strict';

const Controller = require('egg').Controller;

class User extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { id } = this.ctx.params;

    // this.service.user 等同于 this.ctx.service.user
    const result = await this.service.user.get(id);

    this.ctx.body = { result };
  }
}

module.exports = User;
