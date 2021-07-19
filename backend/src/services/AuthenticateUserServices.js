import AppError from '../errors/AppError';

class AuthenticateUserServices {
  constructor({ BCriptHashProvider, Repository, jwtTokenProvider }) {
    this.BCriptHashProvider = BCriptHashProvider;
    this.Repository = Repository;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  async execute({ password, email }) {
    const user = await this.Repository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail ou senha esta, incorreto.', 404);
    }

    const check = await this.BCriptHashProvider.compareHash(
      password,
      user.password
    );

    if (!check) {
      throw new AppError('E-mail ou senha esta, incorreto.', 404);
    }

    const token = this.jwtTokenProvider.generateToken(user.id);

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserServices;
