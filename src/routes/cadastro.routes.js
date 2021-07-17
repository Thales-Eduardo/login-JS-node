import { Router } from 'express';

import CreateUserServices from '../services/CreateUserServices';

import UuidProvider from '../providers/uuidProvider/UuidProvider';
import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

const cadastro = Router();

cadastro.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

export default cadastro;
