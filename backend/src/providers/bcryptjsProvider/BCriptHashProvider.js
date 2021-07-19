import { hash, compare } from 'bcryptjs';

class BCriptHashProvider {
  async generateHash(payload) {
    return await hash(payload, 8);
  }

  async compareHash(payload, hashed) {
    return await compare(payload, hashed);
  }
}

export default new BCriptHashProvider();
