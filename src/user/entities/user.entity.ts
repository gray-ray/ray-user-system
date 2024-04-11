import {} from '@nestjs/typeorm';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import Application from 'src/applications/entities/application.entity';
import Role from 'src/roles/entities/role.entity';
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

  @Exclude()
  @ManyToMany(() => Role, (role) => role?.users)
  @JoinTable({
    name: 'user_role_map',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @BeforeInsert()
  async encryptPwd() {
    if (!this.password) return;
    this.password = await bcrypt.hashSync(this.password, 10);
  }

  responseObject(): UserResponse {
    const { apps = [], roles = [], ...reset } = this;

    const res: UserResponse = {
      ...reset,
      appIds: [],
      roleIds: [],
    };


    if (apps?.length > 0) {
      res.appIds = apps?.map((o) => o?.app_id);
    }

    if (roles?.length > 0) {
      res.roleIds = roles?.map((o) => o?.role_id);
    }

    return res;
  }
}
