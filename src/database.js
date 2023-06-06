import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  async #persist() {
    try {
      await fs.writeFile(databasePath, JSON.stringify(this.#database));
    } catch {
      throw new Error('failed save local .json file');
    }
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) =>
        Object.entries(search).some(([key, value]) =>
          row[key].toLowerCase().includes(value.toLowerCase()),
        ),
      );
    }

    return data;
  }

  insert(table, data) {
    if (!this.#database[table]) this.#database[table] = [];

    this.#database[table].push(data);

    this.#persist();

    return data;
  }

  delete(table, id) {
    const taskIndex = this.#database[table]?.findIndex(
      (task) => task.id === id,
    );

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.#database[table].splice(taskIndex, 1);
    this.#persist();
  }

  update(table, id, data) {
    const taskIndex = this.#database[table]?.findIndex(
      (task) => task.id === id,
    );

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.#database[table][taskIndex] = {
      ...this.#database[table][taskIndex],
      ...data,
    };
    this.#persist();
  }
}
