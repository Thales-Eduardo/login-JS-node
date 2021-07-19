import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';

import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import jwtTokenProvider from '../providers/jwtTokenProvider/Token';

import Repository from '../repository/Repository';

const login = Router();

login.post('/', async (req, res) => {
  const { password, email } = req.body;

  const authenticateUser = new AuthenticateUserServices({
    BCriptHashProvider,
    Repository,
    jwtTokenProvider,
  });

  const { user, token } = await authenticateUser.execute({
    password,
    email,
  });

  delete user.password;

  return res.json({ user, token });
});

export default login;
