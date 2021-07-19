import AppError from '../errors/AppError';

class CreateUserServices {
  constructor({ Repository, BCriptHashProvider, UuidProvider }) {
    this.Repository = Repository;
    this.BCriptHashProvider = BCriptHashProvider;
    this.UuidProvider = UuidProvider;
  }

  async execute({ name, email, password }) {
    const currentContent = await this.Repository.findData();

    const hashedPassword = await this.BCriptHashProvider.generateHash(password);

    const verificarEmail = await this.Repository.findByEmail(email);

    if (verificarEmail) {
      throw new AppError('Esse email já existe!');
    }

    const resposta = {
      id: this.UuidProvider.generateUuid(),
      name,
      email,
      password: hashedPassword,
      avatar: 'default',
    };

    currentContent.push(resposta);

    await this.Repository.saveData(currentContent);

    return resposta;
  }
}

export default CreateUserServices;
