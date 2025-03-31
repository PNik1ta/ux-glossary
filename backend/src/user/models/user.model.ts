import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../shared/interfaces/user.interface';
import { ERoles } from '../../shared/enums/roles.enum';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column({
    type: 'enum',
    enum: ERoles,
    default: ERoles.USER,
  })
  role: ERoles;

  @Column()
  username: string;

  @Column({ nullable: true })
  rt?: string;
}
