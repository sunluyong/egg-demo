'use strict';

const Service = require('egg').Service;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class User extends Service {

  async get(id) {
    const user = await this.ctx.model.User.findByPk(id);
    return user;
  }

  async list(pageSize, pageNo, orderBy = 'id', order = 'ASC') {
    const offset = pageSize * (pageNo - 1);

    // const users = await this.ctx.model.User.findAll({
    //   attributes: ['id', 'name', 'config'],
    //   where: {
    //     deleted: 0
    //   },
    //   order: [[orderBy, order],],
    //   limit: toInt(pageSize),
    //   offset
    // });

    // const total = await this.ctx.model.User.count({
    //   where: {
    //     id: {
    //       [this.app.Sequelize.Op.eq]: 0,
    //     }
    //   }
    // });

    const { count, rows } = await this.ctx.model.User.findAndCountAll({
      attributes: ['id', 'name', 'config'],
      where: {
        deleted: 0,
      },
      order: [[orderBy, order]],
      limit: toInt(pageSize),
      offset,
    });

    return {
      users: rows,
      pages: {
        pageNo,
        pageSize,
        total: count,
      },
    };
  }

  async insert(user) {
    const result = await this.ctx.model.User.create(user);

    return {
      insertId: result.dataValues.id,
    };
  }

  async update(user) {
    const { id, ...attrs } = user;
    const [, affectedRows] = await this.ctx.model.User.update(attrs, {
      where: { id },
      returning: true, // needed for affectedRows to be populated
      plain: true, // makes sure that the returned instances are just plain objects
    });

    return { affectedRows };
  }

  // 软删除
  async delete(id) {
    const [, affectedRows] = await this.ctx.model.User.update({ deleted: 1 }, {
      where: { id },
      returning: true,
      plain: true,
    });

    return { affectedRows };
  }

  // 从表结构中移除
  async hardDelete(id) {
    const numAffectedRows = await this.ctx.model.User.destroy({
      where: { id },
    });
    return numAffectedRows;
  }
}

module.exports = User;
