'use strict';

module.exports = app => {
  // 获取数据类型
  const { INTEGER, STRING, TEXT, DATE } = app.Sequelize;

  // 定义模型
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    config: TEXT('tiny'),
    deleted: { type: INTEGER, defaultValue: 0 },
    created_at: DATE,
    updated_at: DATE,
  }, {
    // 禁用 created_at、updated_at 自动转换，使用 mysql 管理
    // 方便后续迁移 ORM 等需求
    timestamps: false,
  });

  return User;
};
