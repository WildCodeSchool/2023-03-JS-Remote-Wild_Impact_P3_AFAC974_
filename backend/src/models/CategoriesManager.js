const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  insert(categories) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      categories.category,
    ]);
  }

  update(categories) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [categories.name, categories.id]
    );
  }
}

module.exports = CategoriesManager;