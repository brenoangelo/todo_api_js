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

  delete(table, id) {
    const taskIndex = this.#database[table]?.findIndex(
      (task) => task.id === id,
    );

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.#database[table].splice(taskIndex, 1);
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
  }
}
