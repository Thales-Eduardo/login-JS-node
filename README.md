# Login e cadastro de usuário apenas com javascript puro ❤.

Fiz esse exercício apenas para praticar um pouco🐱‍💻.

- Os dados são persistidos em um arquivo .json.

- O back-end e separado do front-end.

---

# Código para listar e salvar dados no arquivo.

```js
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
```

```json
[
  {
    "id": "84453df7-1dc5-45e4-b743-9c6e44a3e930",
    "name": "Thales Eduardo",
    "email": "thalesdev22@gmail.com",
    "password": "$2a$08$U75GLpuglJLK8Tj7GrR3t.rebRMuiE/pQpCm7RApZYEOXe1AXsiJu",
    "avatar": "1c7945cd7c74b6d53f70-8f5f62d5b40af8b6e30ffb33982ac881.jpg"
  }
]
```
