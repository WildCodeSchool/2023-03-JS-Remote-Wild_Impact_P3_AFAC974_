const AbstractManager = require("./AbstractManager");

class UserFavouriteManager extends AbstractManager {
  constructor() {
    super({ table: "user_favourites" });
  }

  findFavouritesUser() {
    return this.database.query(
      `
        SELECT user_favourites.users_id, user_favourites.works_id, summary_title, image_src, image_alt
        FROM ${this.table}
        INNER JOIN  works on works.id = user_favourites.works_id
        INNER JOIN users on users.id = user_favourites.users_id       
        ORDER BY user_favourites.users_id ASC;
      `,
      []
    );
  }

  findFavouritesByIdUser(idUser) {
    return this.database.query(
      `
        SELECT user_favourites.users_id, user_favourites.works_id, summary_title, image_src, image_alt
        FROM ${this.table}
        INNER JOIN  works on works.id = user_favourites.works_id
        INNER JOIN users on users.id = user_favourites.users_id
        WHERE user_favourites.users_id = ?;
      `,
      [idUser]
    );
  }

  findFavouritesByEmailUser(emailUser) {
    return this.database.query(
      `
        SELECT user_favourites.users_id, user_favourites.works_id, summary_title, image_src, image_alt
        FROM ${this.table}
        INNER JOIN  works on works.id = user_favourites.works_id
        INNER JOIN users on users.id = user_favourites.users_id
        WHERE users.email = ?;
      `,
      [emailUser]
    );
  }

  insert(favourites) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      favourites.title,
    ]);
  }
}

module.exports = UserFavouriteManager;