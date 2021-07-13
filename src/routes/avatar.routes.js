import { Router } from 'express';
import multer from 'multer';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

const avatar = Router();
const upload = multer(uploadConfig);

avatar.patch('/', upload.single('avatar'), async (req, res) => {
  try {
    console.log(req.file.filename);
    const UpdateUserAvatar = new UpdateUserAvatarService();

    const newAvatar = await UpdateUserAvatar.execute({
      avatar: req.file.filename,
    });

    return res.status(200).json(newAvatar);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

export default avatar;
