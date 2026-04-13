import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    creeate(@Body() dto: CreateTaskDto, @Request() req) {
      return this.tasksService.create(dto, req.user.userId);
    }

    @Get(':columnId')
    findByColumn(@Param('columnId') columnId: string) {
      return this.tasksService.findByColumn(columnId);
    }

    @Patch('move')
    moveTask(@Body() body: any, @Request() req) {
      return this.tasksService.moveTask(body, req.user.userId);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.tasksService.delete(id);
    }
}