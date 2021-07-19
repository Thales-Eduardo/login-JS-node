import AppError from '../errors/AppError';

class ProfileUpdateServices {
  constructor({ BCriptHashProvider, Repository }) {
    this.BCriptHashProvider = BCriptHashProvider;
    this.Repository = Repository;
  }

  async execute({ id, name, email, oldPassword, password }) {
    const currentContent = await this.Repository.findData();

    const verificarEmail = await this.Repository.findByEmail(email);

    if (verificarEmail && verificarEmail.id !== id) {
      throw new Error('Esse e-mail já está em uso!.');
    }

    if (password && oldPassword) {
      const verificarPassword = await this.BCriptHashProvider.compareHash(
        oldPassword,
        verificarEmail.password
      );

      if (!verificarPassword) {
        throw new AppError(
          'Para atualizar sua senha, informe sua antiga senha correta!'
        );
      }
    }

    const user = await this.Repository.findByIndexId(id);

    if (user < 0) {
      throw new AppError('Esse usário não existe.');
    }

    const hashedPassword = await this.BCriptHashProvider.generateHash(password);

    currentContent[user] = {
      id,
      name: name ? name : currentContent[user].name,
      email: email ? email : currentContent[user].email,
      password: password ? hashedPassword : currentContent[user].password,
      avatar: currentContent[user].avatar,
    };

    await this.Repository.saveData(currentContent);

    return { id, name, email, password };
  }
}

export default ProfileUpdateServices;
