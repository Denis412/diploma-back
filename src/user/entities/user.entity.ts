import { Exclude } from 'class-transformer';
import { Project } from 'src/projects/entities/project.entity';
import { Fullname } from 'src/shared';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
