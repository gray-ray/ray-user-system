import {} from '@nestjs/typeorm';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Application from 'src/applications/entities/application.entity';
import { UserResponse } from '../dto/user.dto';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Exclude()
  @Column({ select: false, nullable: true })
  password: string;

  @Column()
  email: string;

  @Column()
  display_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Exclude()
  @ManyToMany(() => Application, (app) => app?.users)
  @JoinTable({
    name: 'user_application_map',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'app_id' },
  })
  apps: Application[];

  responseObject(): UserResponse {
    const { apps = [], ...reset } = this;

    const res: UserResponse = {
      ...reset,
      appIds: [],
    };

    if (apps?.length > 0) {
      res.appIds = apps?.map((o) => o?.app_id);
    }

    return res;
  }
}