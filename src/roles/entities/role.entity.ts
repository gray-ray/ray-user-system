import {} from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import Permission from 'src/permissions/entities/permission.entity';
import Application from 'src/applications/entities/application.entity';
import User from 'src/user/entities/user.entity';
import { RoleResponse } from '../dto/role.dto';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Application, (app) => app?.roles)
  applications: Application[];

  @ManyToMany(() => User, (user) => user?.roles)
  users: User[];

  @ManyToMany(() => Permission, (per) => per?.roles)
  @JoinTable({
    name: 'role_permission_map',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: Permission[];

  responseObject(): RoleResponse {
    const { applications = [], permissions = [], ...reset } = this;

    const res: RoleResponse = {
      ...reset,
      permissionIds: [],
      appIds: [],
    };

    if (applications?.length > 0) {
      res.appIds = applications?.map((o) => o?.app_id);
    }

    if (permissions?.length > 0) {
      res.permissionIds = permissions?.map((o) => o?.permission_id);
    }

    return res;
  }
}
