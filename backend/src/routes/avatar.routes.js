import { Router } from 'express';
import multer from 'multer';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

import ensureAuthentication from '../middleware/ensureAuthentication';

import DiscStorageRepository from '../providers/multerProvider/DiscStorageProvider';
import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

const avatar = Router();
const upload = multer(uploadConfig);

avatar.patch(
  '/',
  ensureAuthentication,
  upload.single('avatar'),
  async (req, res) => {
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
);

export default avatar;
