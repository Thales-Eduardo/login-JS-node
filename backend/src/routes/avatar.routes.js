import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ensureAuthentication from '../middleware/ensureAuthentication';

import AvatarController from '../controllers/AvatarController';

const avatar = Router();
const upload = multer(uploadConfig);

avatar.patch(
  '/',
  ensureAuthentication,
  upload.single('avatar'),
  AvatarController.update
);

export default avatar;
