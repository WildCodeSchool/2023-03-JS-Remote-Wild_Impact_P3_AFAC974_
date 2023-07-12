const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findByMail(email) {
    return this.database.query(`select * from  ${this.table} where email = ?`, [
      email,
    ]);
  }

  insert(email, password) {
    return this.database.query(
      `insert into ${this.table} (email, hashed_password) values (?, ?)`,
      [email, password]
    );
  }

  deleteByMail(email) {
    return this.database.query(`delete from ${this.table} where email = ?`, [
      email,
    ]);
  }

  update(user, exEmail, newEmail) {
    return this.database.query(
      `update ${this.table} set email = ?, firstname = ? where email = ?`,
      [newEmail, user.firstname, exEmail]
    );
  }
}
module.exports = UserManager;
