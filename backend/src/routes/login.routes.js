import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';

import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

const login = Router();

login.post('/', async (req, res) => {
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
});

export default login;
