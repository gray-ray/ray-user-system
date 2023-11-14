import {} from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import Permission from 'src/permissions/entities/permission.entity';
import Application from 'src/applications/entities/application.entity';
import User from 'src/user/entities/user.entity';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @ManyToMany(() => User, (user) => user?.roles)
  // users: User[];

  // @ManyToMany(() => Application, (app) => app?.roles)
  // applications: Application[];

  // @ManyToMany(() => Permission, (per) => per?.roles)
  // @JoinTable({ name: 'role_permission_map' })
  // permissions: Permission[];
}
