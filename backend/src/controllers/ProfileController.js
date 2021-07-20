import ProfileUpdateServices from '../services/ProfileUpdateServices';

import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

class ProfileController {
  async update(req, res) {
    const { id } = req.userId;
    const { name, email, oldPassword, password } = req.body;

    const profileUpdate = new ProfileUpdateServices({
      BCriptHashProvider,
      Repository,
    });

    const user = await profileUpdate.execute({
      id,
      name,
      email,
      oldPassword,
      password,
    });

    delete user.password;

    return res.status(200).json(user);
  }
}

export default new ProfileController();
