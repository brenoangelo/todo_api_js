export class Database {
  #database = {};

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
