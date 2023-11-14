import {} from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import User from 'src/user/entities/user.entity';
import Role from 'src/roles/entities/role.entity';

@Entity('applications')
export default class Application {
  @PrimaryGeneratedColumn()
  app_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @ManyToMany(() => User, (user) => user?.applications)
  // users: User[];

  // @ManyToMany(() => Role, (per) => per?.applications)
  // @JoinTable({ name: 'app_role_map' })
  // roles: Role[];
}
