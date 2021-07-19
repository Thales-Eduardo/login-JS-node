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

    const user = await this.Repository.findByIndexId(id);

    if (user < 0) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    const checkAvatar = await this.Repository.findById(id);

    if (checkAvatar.avatar) {
      await this.DiscStorageRepository.deleteFile(checkAvatar.avatar);
    }

    content[user].avatar = avatar;

    await this.Repository.saveData(content);

    const response = await this.Repository.findById(id);

    delete response.password;

    return response;
  }
}

export default UpdateUserAvatarService;
