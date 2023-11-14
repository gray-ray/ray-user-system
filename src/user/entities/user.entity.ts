import {} from '@nestjs/typeorm';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import Application from 'src/applications/entities/application.entity';
import Role from 'src/roles/entities/role.entity';

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

  // @ManyToMany(() => Role, (role) => role?.users)
  // @JoinTable({ name: 'user_role_map' })
  // roles: Role[];

  // @ManyToMany(() => Application, (app) => app?.users)
  // @JoinTable({ name: 'user_app_map' })
  // applications: Application[];
}
