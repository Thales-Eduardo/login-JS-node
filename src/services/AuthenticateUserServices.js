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
