import {} from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import Role from 'src/roles/entities/role.entity';

@Entity('permissions')
export default class Permission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @ManyToMany(() => Role, (role) => role?.permissions)
  // roles: Role[];
}
