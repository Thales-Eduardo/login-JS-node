import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';

import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

const login = Router();

login.post('/', async (req, res) => {
  try {
    const { password, email } = req.body;

    const authenticateUser = new AuthenticateUserServices({
      BCriptHashProvider,
      Repository,
    });

    const user = await authenticateUser.execute({
      password,
      email,
    });

    delete user.password;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

export default login;
