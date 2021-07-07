import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';

import Repository from '../repository/Repository';

class CreateUserServices {
  async execute({ name, email, password }) {
    const currentContent = await Repository.findData();

    const hashedPassword = await hash(password, 8);

    const verificarEmail = currentContent.find(data => data.email === email);

    if (verificarEmail) {
      throw new Error('Esse email já existe!');
    }

    const resposta = { id: uuid(), name, email, password: hashedPassword };

    currentContent.push(resposta);

    await Repository.saveData(currentContent);

    return resposta;
  }
}

export default CreateUserServices;
