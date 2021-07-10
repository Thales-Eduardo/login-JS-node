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

    const {
      id: nId,
      name: nName,
      email: nEmail,
      password: nPassword,
    } = currentContent[user];

    const update = {
      id: nId,
      name: name ? name : nName,
      email: email ? email : nEmail,
      password: password ? password : nPassword,
    };

    currentContent[user] = update;

    currentContent.find(data => {
      const hashedPassword = hashSync(password, 8);
      return (data.password = hashedPassword);
    });

    await Repository.saveData(currentContent);

    return update;
  }
}

export default ProfileUpdateServices;
