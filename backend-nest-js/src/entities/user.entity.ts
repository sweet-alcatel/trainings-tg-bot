import {
  Column,
  Table,
  Model,
  PrimaryKey,
  Default,
  HasMany,
  Unique,
} from 'sequelize-typescript';
import { Training } from './training.entity';

@Table({
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model<User> {
  @PrimaryKey
  @Unique
  @Column
  telegramID: string;

  @Column
  name: string;

  @Unique
  @Column
  username: string;

  @Column
  height: string;

  @Column
  weight: string;

  @Column
  goals: string;

  @Column
  injuries: string;

  @Column
  comment: string;

  @Default('USER')
  @Column
  role: 'ADMIN' | 'USER';

  @HasMany(() => Training)
  trainings: Training[];
}
