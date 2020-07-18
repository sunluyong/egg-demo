'use strict';

const Service = require('egg').Service;

class User extends Service {
  async get(id) {
    const user = await this.app.mysql.get('user', { id });
    return user;
  }

  async list(pageSize, pageNo, orderBy = 'id', order = 'ASC') {

    let sql = 'select id, name, config from user ';
    sql += 'where deleted = 0 ';
    sql += 'order by ? ? ';
    sql += 'limit ?,?;';

    const offset = pageSize * (pageNo - 1);
    const users = await this.app.mysql.query(sql, [ orderBy, order, offset, pageSize ]);

    const totalNumRow = await this.app.mysql.query('select count(id) as totalNum from user where deleted = 0;');

    return {
      users,
      pages: {
        pageNo,
        pageSize,
        total: totalNumRow[0].totalNum,
      },
    };
  }

  async insert(user) {
    const result = await this.app.mysql.insert('user', user);
    return result;
  }

  async update(user) {
    const result = await this.app.mysql.update('user', user);
    return result;
  }

  // 软删除
  async delete(id) {
    const result = await this.app.mysql.update('user', {
      id,
      deleted: 1,
    });
    return result;
  }

  // 从表结构中移除
  async hardDelete(id) {
    const result = await this.app.mysql.delete('user', { id });
    return result;
  }
}

module.exports = User;
