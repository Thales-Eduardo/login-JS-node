import AppError from '../errors/AppError';

class UpdateUserAvatarService {
  constructor({ BCriptHashProvider, Repository, DiscStorageRepository }) {
    this.Repository = Repository;
    this.DiscStorageRepository = DiscStorageRepository;
    this.BCriptHashProvider = BCriptHashProvider;
    this.AppError = AppError;
  }

  async execute({ id, avatar }) {
    const content = await this.Repository.findData();

    const checkAvatar = content.find(data => data.id === id);

    if (checkAvatar.avatar) {
      await this.DiscStorageRepository.deleteFile(checkAvatar.avatar);
    }

    const user = content.findIndex(data => data.id === id);

    if (user < 0) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    content[user].avatar = avatar;

    await this.Repository.saveData(content);

    return checkAvatar;
  }
}

export default UpdateUserAvatarService;
