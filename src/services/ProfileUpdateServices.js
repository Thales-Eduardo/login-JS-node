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
    console.log('passo aq ' + user);

    if (user < 0) {
      throw new Error('Esse usário não existe.');
    }

    currentContent[user] = {
      id,
      name: name ? name : currentContent[user].name,
      email: email ? email : currentContent[user].email,
      password: password ? password : currentContent[user].password,
    };

    currentContent.find(data => {
      const hashedPassword = hashSync(password, 8);
      return (data.password = hashedPassword);
    });

    await Repository.saveData(currentContent);

    const update = { id, name, email, password };
    return update;
  }
}

export default ProfileUpdateServices;
