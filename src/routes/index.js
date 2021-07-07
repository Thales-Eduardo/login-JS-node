import { Router } from 'express';

import cadastroRoutes from './cadastro.routes';
import loginRoutes from './login.routes';

const router = Router();

router.use('/cadastro', cadastroRoutes);
router.use('/log', loginRoutes);

export default router;
