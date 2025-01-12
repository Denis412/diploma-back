import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('project_user_groups')
export class ProjectUserGroup {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Project, (project) => project.userGroups)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'project_user_groups__members',
    joinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_user_group_id',
      referencedColumnName: 'id',
    },
  })
  members: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
