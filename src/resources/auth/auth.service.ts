import { userRepo } from '../users/user.repository';
import { IAuth } from './auth.model';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../common/config';

const getToken = async (
  authData: IAuth
): Promise<{ token: string } | undefined> => {
  const { login, password } = authData;
  const user = await userRepo().findOne({ login });

  if (user) {
    console.log('  user: ', user);
    console.log(
      'bcrypt.compareSync(password, user.password)  ',
      bcrypt.compareSync(password, user.password)
    );
  }
  if (
    user &&
    bcrypt.compareSync(password, user.password) &&
    config.JWT_SECRET_KEY
  ) {
    const payload = { userId: user.id, login };
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: 3600,
    });
    return { token };
  }

  return undefined;
};

export default { getToken };
