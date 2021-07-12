import { compareSync, hashSync } from 'bcryptjs';

import Repository from '../repository/Repository';

class ProfileUpdateServices {
  async execute({ id, name, email, oldPassword, password }) {
    const currentContent = await Repository.findData();

    const verificarEmail = currentContent.find(data => data.email === email);

    if (verificarEmail && verificarEmail.id !== id) {
      throw new Error('Esse e-mail já está em uso!.');
    }

    const verificarPassword = currentContent.find(data =>
      compareSync(oldPassword, data.password)
    );

    if (!verificarPassword) {
      throw new Error(
        'Para atualizar sua senha, informe sua antiga senha correta!'
      );
    }

    const user = currentContent.findIndex(data => data.id === id);

    if (user < 0) {
      throw new Error('Esse usário não existe.');
    }

    const hashedPassword = hashSync(password, 8);

    currentContent[user] = {
      id,
      name: name ? name : currentContent[user].name,
      email: email ? email : currentContent[user].email,
      password: password ? hashedPassword : currentContent[user].password,
    };

    await Repository.saveData(currentContent);

    return { id, name, email, password };
  }
}

export default ProfileUpdateServices;
