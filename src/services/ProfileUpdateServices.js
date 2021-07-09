import { compareSync } from 'bcryptjs';

import Repository from '../repository/Repository';

class AuthenticateUserServices {
  async execute({ id, name, email, oldPassword, newPassword }) {
    const currentContent = await Repository.findData();

    const user = currentContent.findIndex(data => data.id === id);

    if (!user) {
      throw new Error('Token JWT invalido');
    }

    const verificarEmail = currentContent.find(data => data.email === email);

    if (verificarEmail && verificarEmail.id !== id) {
      throw new Error('Esse e-mail já está em uso!.');
    }

    const verificarPassword = currentContent.find(data =>
      compareSync(oldPassword, data.password)
    );

    if (!verificarPassword) {
      throw new Error(
        'Para atualizar sua senha, informe sua antiga senha correto!'
      );
    }

    const hashedPassword = await hash(newPassword, 8);

    const resposta = { name, email, password: hashedPassword };

    currentContent.push(resposta);

    await Repository.saveData(currentContent);

    return resposta;
  }
}

export default AuthenticateUserServices;
