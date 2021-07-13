import DiscStorageRepository from '../repository/DiscStorageRepository';
import Repository from '../repository/Repository';

class UpdateUserAvatarService {
  async execute({ avatar }) {
    const content = await Repository.findData();

    const checkAvatar = content.find(data => data.avatar);

    if (checkAvatar.avatar) {
      await DiscStorageRepository.deleteFile(checkAvatar.avatar);
    }
    //salvar o nome do arquivo no avatar

    await DiscStorageRepository.saveFile(avatar);

    return 'ok';
  }
}

export default UpdateUserAvatarService;
