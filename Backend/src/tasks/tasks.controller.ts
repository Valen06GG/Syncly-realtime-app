import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    creeate(@Body() dto: CreateTaskDto) {
      return this.tasksService.create(dto);
    }

    @Get(':columnId')
    findByColumn(@Param('columnId') columnId: string) {
      return this.tasksService.findByColumn(columnId);
    }

    @Patch('move')
    moveTask(@Body() body: any) {
      return this.tasksService.moveTask(body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.tasksService.delete(id);
    }
}