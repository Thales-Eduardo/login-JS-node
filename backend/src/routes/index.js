import { Router } from 'express';

import cadastroRoutes from './cadastro.routes';
import loginRoutes from './login.routes';
import profileRoutes from './profile.routes';
import avatarRoutes from './avatar.routes';

const router = Router();

router.use('/cadastro', cadastroRoutes);
router.use('/log', loginRoutes);
router.use('/profile', profileRoutes);
router.use('/avatar', avatarRoutes);

export default router;
