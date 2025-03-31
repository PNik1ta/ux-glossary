import { ERoles } from '../../shared/enums/roles.enum';
import { IUser } from '../../shared/interfaces/user.interface';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  id?: number;
  email: string;
  password_hash: string;
  role: ERoles;
  username: string;
  rt?: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.password_hash = user.password_hash;
    this.role = user.role;
    this.username = user.username;
    this.rt = user.rt;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(10);
    this.password_hash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.password_hash);
  }
}
