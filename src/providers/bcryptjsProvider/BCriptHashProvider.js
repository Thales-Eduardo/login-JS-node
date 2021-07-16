import { hash, compareSync } from 'bcryptjs';

class BCriptHashProvider {
  async generateHash(payload) {
    return hash(payload, 8);
  }

  compareHash(payload, hashed) {
    return compareSync(payload, hashed);
  }
}

export default new BCriptHashProvider();
