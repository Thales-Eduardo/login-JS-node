import { v4 as uuid } from 'uuid';

class UuidProvider {
  generateUuid() {
    return uuid();
  }
}

export default new UuidProvider();
