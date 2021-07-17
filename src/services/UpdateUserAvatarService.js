class UpdateUserAvatarService {
  constructor({ BCriptHashProvider, Repository }) {
    this.BCriptHashProvider = BCriptHashProvider;
    this.Repository = Repository;
  }

  async execute({ id, avatar }) {
    const content = await this.Repository.findData();

    const checkAvatar = content.find(data => data.avatar);

    if (checkAvatar.avatar) {
      await this.DiscStorageRepository.deleteFile(checkAvatar.avatar);
    }

    const user = content.findIndex(data => data.id === id);

    if (user < 0) {
      throw new Error('Usuário não encontrado.');
    }

    content[user].avatar = avatar;

    await this.Repository.saveData(content);

    return checkAvatar;
  }
}

export default UpdateUserAvatarService;
