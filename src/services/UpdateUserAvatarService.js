import DiscStorageRepository from '../providers/multerProvider/DiscStorageProvider';
import Repository from '../repository/Repository';

class UpdateUserAvatarService {
  async execute({ id, avatar }) {
    const content = await Repository.findData();

    const checkAvatar = content.find(data => data.avatar);

    if (checkAvatar.avatar) {
      await DiscStorageRepository.deleteFile(checkAvatar.avatar);
    }

    const user = content.findIndex(data => data.id === id);

    if (user < 0) {
      throw new Error('Usuário não encontrado.');
    }

    content[user].avatar = avatar;

    await Repository.saveData(content);

    return checkAvatar;
  }
}

export default UpdateUserAvatarService;
