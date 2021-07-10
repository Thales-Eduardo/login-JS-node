import { Router } from 'express';

import ProfileUpdateServices from '../services/ProfileUpdateServices';

const profile = Router();

profile.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, oldPassword, password } = req.body;

    const profileUpdate = new ProfileUpdateServices();

    const user = await profileUpdate.execute({
      id,
      name,
      email,
      oldPassword,
      password,
    });

    delete user.password;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

export default profile;
