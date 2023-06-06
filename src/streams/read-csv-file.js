import fs from 'node:fs';
import { parse } from 'csv-parse';

const filePath = new URL('./tasks.csv', import.meta.url);

const fsReadStream = fs.createReadStream(filePath);

export async function readCsvFile() {
  fsReadStream
    .pipe(parse())
    .on('data', (data) => {
      if(data.includes('title', 'description')) {
        return
      }

      const [title, description] = data

      saveTask({
        title,
        description
      })
    })
    .on('end', () => {
      console.log('CSV file reading completed.')
    })
    .on('error', (error) => {
      console.error('Error reading the CSV file:', error)
    })
}

function saveTask(task) {
  fetch('http://localhost:3333/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-type': 'application/json',
    },
  });
}

readCsvFile();
