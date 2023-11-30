import {} from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import User from 'src/user/entities/user.entity';
import Role from 'src/roles/entities/role.entity';
import { AppResponse } from '../dto/application.dto';

@Entity('applications')
export default class Application {
  @PrimaryGeneratedColumn()
  app_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user?.apps)
  users: User[];

  @ManyToMany(() => Role, (per) => per?.applications)
  @JoinTable({
    name: 'app_role_map',
    joinColumn: { name: 'app_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  responseObject(): AppResponse {
    const { roles = [], users = [], ...reset } = this;

    const res: AppResponse = {
      ...reset,
      roleIds: [],
      userIds: [],
    };

    if (roles?.length > 0) {
      res.roleIds = roles?.map((o) => o?.role_id);
    }

    if (users?.length > 0) {
      res.userIds = users?.map((o) => o?.user_id);
    }

    return res;
  }
}
