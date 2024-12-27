import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'trainings',
  createdAt: false,
  updatedAt: false,
})
export class Training extends Model<Training> {
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column
  date: string;

  @BelongsTo(() => User)
  user: User;
}
