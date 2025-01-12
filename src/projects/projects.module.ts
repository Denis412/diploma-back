import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectTask } from './entities/project-task.entity';
import { ProjectUserGroup } from './entities/project-user-group.entity';
import { ProjectTaskStatus } from './entities/project-task-status.entity';
import { ProjectTaskPriority } from './entities/project-task-priority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectTask,
      ProjectTaskStatus,
      ProjectTaskPriority,
      ProjectUserGroup,
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
