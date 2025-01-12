import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectUserGroup } from './project-user-group.entity';
import { ProjectTask } from './project-task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.owneredProjects, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => ProjectUserGroup, (userGroup) => userGroup.project)
  userGroups: ProjectUserGroup[];

  @OneToMany(() => ProjectTask, (task) => task.project)
  tasks: ProjectTask[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'projects__employees',
    joinColumn: {
      name: 'employee_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  employees: User[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
