import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./tasks.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private repo: Repository<Task>,
    ) {}

    create(dto: CreateTaskDto) {
        const task = this.repo.create(dto);
        return this.repo.save(task);
    }

    findByBoard(boardId: string) {
        return this.repo.find({ 
            where: { columnId: boardId } 
        });
    }

    findByColumn(columnId: string) {
        return this.repo.find({ 
            where: { columnId },
            order: { order: "ASC" },
        });
    }

    async moveTask(data: any) {
        const task = await this.repo.findOneBy({ id: data.taskId });

        if (!task) return null;

        task.columnId = data.toColumnId;
        task.order = data.newOrder;

        return this.repo.save(task);
    }

    async delete(id: string) {
        return this.repo.delete(id);
    }
}