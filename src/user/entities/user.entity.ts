import { Exclude } from 'class-transformer';
import { ProjectTask } from 'src/projects/entities/project-task.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Fullname } from 'src/shared';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column(() => Fullname)
  fullname: Fullname;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Project, (project) => project.owner)
  owneredProjects: Project[];

  @ManyToMany(() => Project, (project) => project.employees)
  myProjects: Project[];

  @ManyToMany(() => ProjectTask, (projectTask) => projectTask.performers)
  tasks: ProjectTask[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
