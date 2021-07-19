import { promisify } from 'util';
import { sign, verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';

class Token {
  generateToken(id) {
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: id,
      expiresIn,
    });

    return token;
  }

  async checkToken(token) {
    const { secret } = authConfig.jwt;
    const response = await promisify(verify)(token, secret);
    return response;
  }
}

export default new Token();

//promisify = pode transformar qualquer função em Promises.
