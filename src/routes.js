import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();
const today = new Date();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const todoList = database.select('tasks');

      return res.end(JSON.stringify(todoList));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: today,
        updated_at: today,
      };

      database.insert('tasks', newTask);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { title, description, isDone } = req.body;
      const { id } = req.params;

      const taskUpdated = {
        title,
        description,
        updated_at: today,
        completed_at: isDone ? today : null,
      };

      database.update('tasks', id, taskUpdated);

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { isDone } = req.body;
      const { id } = req.params;

      const taskCompleted = {
        updated_at: today,
        completed_at: isDone ? today : null,
      };

      database.update('tasks', id, taskCompleted);

      return res.writeHead(204).end();
    },
  },
];
