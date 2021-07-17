class CreateUserServices {
  constructor({ Repository, BCriptHashProvider, UuidProvider }) {
    this.Repository = Repository;
    this.BCriptHashProvider = BCriptHashProvider;
    this.UuidProvider = UuidProvider;
  }

  async execute({ name, email, password }) {
    const currentContent = await this.Repository.findData();

    const hashedPassword = await this.BCriptHashProvider.generateHash(password);

    const verificarEmail = currentContent.find(data => data.email === email);

    if (verificarEmail) {
      throw new Error('Esse email já existe!');
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
