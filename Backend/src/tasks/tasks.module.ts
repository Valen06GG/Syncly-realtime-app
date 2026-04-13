import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/boards.entity';
import { BoardsModule } from 'src/boards/boards.module';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        BoardsModule,
        ColumnsModule,
    ],
    providers: [TasksService],
    controllers: [TasksController],
    exports: [TasksService],
})
export class TasksModule {}
