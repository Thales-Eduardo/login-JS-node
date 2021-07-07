import { compare } from 'bcryptjs';

import Repository from '../repository/Repository';

class AuthenticateUserServices {
  async execute({ password, email }) {
    const currentContent = await Repository.findData();

    const verificarPassword = await currentContent.find(data =>
      compare(password, data.password)
    );

    if (!verificarPassword) {
      throw new Error('E-mail ou senha esta, incorreto.');
    }

    const verificarEmail = currentContent.find(data => data.email === email);

    if (!verificarEmail) {
      throw new Error('E-mail ou senha esta, incorreto.');
    }

    return verificarEmail;
  }
}

export default AuthenticateUserServices;