import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectTask } from './project-task.entity';

@Entity('project_task_priorities')
export class ProjectTaskPriority {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @OneToMany(() => ProjectTask, (projectTask) => projectTask.priority)
  tasks: ProjectTask[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
