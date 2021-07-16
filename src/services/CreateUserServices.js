import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import UuidProvider from '../providers/uuidProvider/UuidProvider';
import Repository from '../repository/Repository';

class CreateUserServices {
  async execute({ name, email, password }) {
    const currentContent = await Repository.findData();

    const hashedPassword = await BCriptHashProvider.generateHash(password);

    const verificarEmail = currentContent.find(data => data.email === email);

    if (verificarEmail) {
      throw new Error('Esse email já existe!');
    }

    const resposta = {
      id: UuidProvider.generateUuid(),
      name,
      email,
      password: hashedPassword,
      avatar: 'default',
    };

    currentContent.push(resposta);

    await Repository.saveData(currentContent);

    return resposta;
  }
}

export default CreateUserServices;
