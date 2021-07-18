import { Router } from 'express';
import multer from 'multer';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

import DiscStorageRepository from '../providers/multerProvider/DiscStorageProvider';
import BCriptHashProvider from '../providers/bcryptjsProvider/BCriptHashProvider';
import Repository from '../repository/Repository';

const avatar = Router();
const upload = multer(uploadConfig);

avatar.patch('/:id', upload.single('avatar'), async (req, res) => {
  const { id } = req.params;

  const UpdateUserAvatar = new UpdateUserAvatarService({
    BCriptHashProvider,
    Repository,
    DiscStorageRepository,
  });

  const newAvatar = await UpdateUserAvatar.execute({
    id,
    avatar: req.file.filename,
  });

  delete newAvatar.password;

  return res.status(200).json(newAvatar);
});

export default avatar;
