import {
  Column,
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
import { ProjectTaskStatus } from './project-task-status.entity';
import { File } from 'src/files/entities/file.entity';
import { ProjectTaskPriority } from './project-task-priority.entity';

@Entity('project_tasks')
export class ProjectTask {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @ManyToMany(() => File)
  @JoinTable({
    name: 'project_tasks__files',
    joinColumn: {
      name: 'file_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_task_id',
      referencedColumnName: 'id',
    },
  })
  files: File[];

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'project_tasks__performers',
    joinColumn: {
      name: 'performer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_task_id',
      referencedColumnName: 'id',
    },
  })
  performers: User[];

  @ManyToOne(
    () => ProjectTaskStatus,
    (projectTaskStatus) => projectTaskStatus.tasks,
  )
  @JoinColumn({ name: 'status_id' })
  status: ProjectTaskStatus;

  @ManyToOne(
    () => ProjectTaskPriority,
    (projectTaskPriority) => projectTaskPriority.tasks,
  )
  @JoinColumn({ name: 'priority_id' })
  priority: ProjectTaskPriority;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
