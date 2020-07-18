'use strict';

const Controller = require('egg').Controller;

class User extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { id } = this.ctx.params;

    // this.service.user 等同于 this.ctx.service.user
    const user = await this.service.user.get(id);

    this.ctx.body = {
      success: !!user,
      user,
    };
  }

  async list() {
    const { pageSize = 10, pageNo = 1 } = this.ctx.request.query;
    const result = await this.service.user.list(pageSize, pageNo);

    this.ctx.body = result;
  }

  async create() {
    const { name, config } = this.ctx.request.body;

    const result = await this.service.user.insert({
      name,
      config,
    });

    this.ctx.body = {
      userId: result.insertId,
    };
  }

  async edit() {
    const { id } = this.ctx.params;
    const { name, config } = this.ctx.request.body;

    const result = await this.service.user.update({
      id,
      name,
      config,
    });

    this.ctx.body = {
      success: result.affectedRows === 1,
    };
  }

  async delete() {
    const { id } = this.ctx.params;
    const result = await this.service.user.delete(id);

    this.ctx.body = {
      success: result.affectedRows === 1,
    };
  }
}

module.exports = User;
