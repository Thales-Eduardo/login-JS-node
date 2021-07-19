import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const fileName = join(__dirname, '../database', 'data.json');

class Repository {
  async findData() {
    const current = await readFile(fileName, 'utf-8');
    return JSON.parse(current);
  }

  async saveData(data) {
    const currentFile = JSON.stringify(data);
    await writeFile(fileName, currentFile, 'utf-8');
    return data;
  }

  async findById(id) {
    const all = await this.findData();
    return all.find(item => item.id === id);
  }

  async findByEmail(email) {
    const all = await this.findData();
    return all.find(item => item.email === email);
  }

  async findByIndexId(id) {
    const all = await this.findData();
    return all.findIndex(item => item.id === id);
  }
}

export default new Repository();

// const test = new Repository();
// let id = '0b19c887-9d73-41e0-91b0-035e26c31f71';
// test.findById(id).then(console.log).catch(console.log);
