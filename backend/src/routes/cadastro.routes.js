import { Router } from 'express';

import CadastroController from '../controllers/CadastroController';

const cadastro = Router();

cadastro.post('/', CadastroController.create);

export default cadastro;
