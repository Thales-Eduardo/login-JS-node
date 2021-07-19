import jwtTokenProvider from '../providers/jwtTokenProvider/Token';
import AppError from '../errors/AppError';

async function ensureAuthentication(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Token JWT ausente ', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decode = await jwtTokenProvider.checkToken(token);

    const { sub } = decode;

    request.userId = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Token JWT invalido', 401);
  }
}

export default ensureAuthentication;
