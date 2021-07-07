import { Router } from 'express';

import AuthenticateUserServices from '../services/AuthenticateUserServices';

const login = Router();

login.post('/', async (req, res) => {
  try {
    const { password, email } = req.body;

    const authenticateUser = new AuthenticateUserServices();

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
