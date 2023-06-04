export class Database {
  #database = {};

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (!this.#database[table]) this.#database[table] = [];

    this.#database[table].push(data);

    return data;
  }
}
