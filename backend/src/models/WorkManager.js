const AbstractManager = require("./AbstractManager");

class WorkManager extends AbstractManager {
  constructor() {
    super({ table: "works" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  insert(work) {
    return this.database.query(
      `insert into ${this.table} (title, summary_title, date, image_src, image_alt, reference, summary, format, techniques_id, categories_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        work.title,
        work.summary_title,
        work.date,
        work.image_src,
        work.image_alt,
        work.reference,
        work.summary,
        work.format,
        work.techniques_id,
        work.categories_id,
      ]
    );
  }

  update(work) {
    return this.database.query(
      `update ${this.table} set title = ? summary_title = ? date = ? image_src = ? image_alt = ? reference = ? summary = ? format = ? techniques_id = ? categories_id = ? where id = ?`,
      [
        work.title,
        work.summary_title,
        work.date,
        work.image_src,
        work.image_alt,
        work.reference,
        work.summary,
        work.format,
        work.techniques_id,
        work.categories_id,
        work.id,
      ]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = WorkManager;
