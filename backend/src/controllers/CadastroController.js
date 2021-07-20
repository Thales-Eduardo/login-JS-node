import CreateUserServices from '../services/CreateUserServices';

import UuidProvider from '../providers/uuidProvider/UuidProvider';
import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

class CadastroController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const CreateUser = new CreateUserServices({
      UuidProvider,
      BCriptHashProvider,
      Repository,
    });

    const user = await CreateUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return res.status(200).json(user);
  }
}

export default new CadastroController();
