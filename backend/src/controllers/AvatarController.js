import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import DiscStorageRepository from '../providers/multerProvider/DiscStorageProvider';
import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

class AvatarController {
  async update(req, res) {
    const { id } = req.userId;

    console.log(id);

    const UpdateUserAvatar = new UpdateUserAvatarService({
      BCriptHashProvider,
      Repository,
      DiscStorageRepository,
    });
    const newAvatar = await UpdateUserAvatar.execute({
      id: id,
      avatar: req.file.filename,
    });

    return res.status(200).json(newAvatar);
  }
}

export default new AvatarController();
