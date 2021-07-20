# Login e cadastro de usuário apenas com javascript puro ❤.

Fiz esse exercício apenas para praticar um pouco, acabei me empolgando😂🐱‍💻.

- Os dados são persistidos em um arquivo .json.

- O back-end e separado do front-end.

- Autenticação JWT.

- Middleware de autenticação.

- Inversão de Dependência.

---

# Estrutura das pastas back-end.

Obs. São as mais importantes, para o intendimento da estrutura do projeto.

- controller = Sera responsável por receber as requisições, enviar os dados da requisição para o service, da ao services as dependências que ele irar usar, e de enviar a resposta.

- providers = São todas as dependências, que a aplicação ira precisar.

- Repository = Sera responsável por fazer todas as operações no `database`.

- services = Aqui sera às regras de negócio da aplicação.

- middleware = Middleware de autenticação.

---

# Código para listar e salvar dados no arquivo e as buscas no database.

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

  async findById(id) {
    const all = await this.findData();
    return all.find((item) => item.id === id);
  }

  async findByEmail(email) {
    const all = await this.findData();
    return all.find((item) => item.email === email);
  }

  async findByIndexId(id) {
    const all = await this.findData();
    return all.findIndex((item) => item.id === id);
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
