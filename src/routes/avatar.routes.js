import { Router } from 'express';

// import AuthenticateUserServices from '../services/AuthenticateUserServices';

const avatar = Router();

avatar.patch('/avatar', async (req, res) => {
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

export default avatar;
