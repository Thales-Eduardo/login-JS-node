import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const fileName = join(__dirname, "../database", "data.json");

class Repository {
  async findData() {
    const current = await readFile(fileName, "utf-8");
    return JSON.parse(current);
  }

  async saveData(data) {
    const currentFile = JSON.stringify(data);
    await writeFile(fileName, currentFile, "utf-8");
    return data;
  }
}

export default new Repository();
