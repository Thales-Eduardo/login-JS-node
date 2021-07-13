import { stat, rename, unlink } from 'fs/promises';
import path from 'path';

import uploadConfig from '../config/upload';

class DiscStorageProvider {
  async saveFile(file) {
    await rename(path.resolve(uploadConfig.directory, file));
    return file;
  }

  async deleteFile(file) {
    const filepath = path.resolve(uploadConfig.directory, file);

    try {
      await stat(filepath);
    } catch (error) {
      return;
    }

    await unlink(filepath);
  }
}

export default new DiscStorageProvider();
