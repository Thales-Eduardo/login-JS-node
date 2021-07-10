import { Router } from 'express';

import cadastroRoutes from './cadastro.routes';
import loginRoutes from './login.routes';
import profileRoutes from './profile.routes';

const router = Router();

router.use('/cadastro', cadastroRoutes);
router.use('/log', loginRoutes);
router.use('/profile', profileRoutes);

export default router;
