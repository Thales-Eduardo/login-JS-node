import AppError from '../errors/AppError';

class AuthenticateUserServices {
  constructor({ BCriptHashProvider, Repository }) {
    this.BCriptHashProvider = BCriptHashProvider;
    this.Repository = Repository;
  }

  async execute({ password, email }) {
    const currentContent = await this.Repository.findData();

    const verificarPassword = currentContent.find(data =>
      this.BCriptHashProvider.compareHash(password, data.password)
    );

    if (!verificarPassword) {
      throw new AppError('E-mail ou senha esta, incorreto.', 404);
    }

    const verificarEmail = currentContent.find(data => data.email === email);

    if (!verificarEmail) {
      throw new AppError('E-mail ou senha esta, incorreto.', 404);
    }

    return verificarEmail;
  }
}

export default AuthenticateUserServices;
