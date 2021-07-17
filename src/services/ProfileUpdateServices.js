class ProfileUpdateServices {
  constructor({ BCriptHashProvider, Repository }) {
    this.BCriptHashProvider = BCriptHashProvider;
    this.Repository = Repository;
  }

  async execute({ id, name, email, oldPassword, password }) {
    const currentContent = await this.Repository.findData();

    const verificarEmail = currentContent.find(data => data.email === email);

    if (verificarEmail && verificarEmail.id !== id) {
      throw new Error('Esse e-mail já está em uso!.');
    }

    if (password && oldPassword) {
      const verificarPassword = currentContent.find(data =>
        this.BCriptHashProvider.compareHash(oldPassword, data.password)
      );

      if (!verificarPassword) {
        throw new Error(
          'Para atualizar sua senha, informe sua antiga senha correta!'
        );
      }
    }

    const user = currentContent.findIndex(data => data.id === id);

    if (user < 0) {
      throw new Error('Esse usário não existe.');
    }

    const hashedPassword = await this.BCriptHashProvider.generateHash(password);

    let avatar = 'defalt';

    currentContent[user] = {
      id,
      name: name ? name : currentContent[user].name,
      email: email ? email : currentContent[user].email,
      password: password ? hashedPassword : currentContent[user].password,
      avatar: avatar ? currentContent[user].avatar : avatar,
    };

    await this.Repository.saveData(currentContent);

    return { id, name, email, password };
  }
}

export default ProfileUpdateServices;
