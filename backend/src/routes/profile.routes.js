import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthentication from '../middleware/ensureAuthentication';

const profile = Router();

profile.put('/', ensureAuthentication, ProfileController.update);

export default profile;
