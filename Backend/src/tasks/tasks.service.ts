import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./tasks.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { BoardsService } from "src/boards/boards.service";
import { ColumnsService } from "src/columns/columns.service";
import { from } from "rxjs";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private repo: Repository<Task>,
        private boardsService: BoardsService,
        private columnsService: ColumnsService,
    ) {}

    async create(dto: CreateTaskDto, userId: string) {
        const column = await this.columnsService.findOne(dto.columnId);

        await this.boardsService.findOneByIdAndUser(column.board.id, userId);

        const task = this.repo.create({
            title: dto.title,
            description: dto.description,
            order: dto.order,
            column,
        });
        return this.repo.save(task);
    }

    findByBoard(boardId: string) {
        return this.repo.find({ 
            relations: ['column', 'column.board'],
        });
    }

    findByColumn(columnId: string) {
        return this.repo.find({ 
            where: { column: { id: columnId } },
            order: { order: "ASC" },
        });
    }

    async moveTask(data: {
        taskId: string;
        toColumnId: string;
        newOrder: number;
    }, userId: string) {
        const { taskId, toColumnId, newOrder } = data;

        const task = await this.repo.findOne({
            where: { id: taskId },
            relations: ['column', 'column.board'],
        });

        if (!task) {
          throw new NotFoundException('Task not found');
        }

        await this.boardsService.findOneByIdAndUser(task.column.board.id, userId);

        const fromColumnId = task.column.id;

        if (fromColumnId === toColumnId) {
            const tasks = await this.repo.find({
                where: { column: { id: toColumnId } },
                order: { order: "ASC" },
            });

            const filtered = tasks.filter((t) => t.id !== taskId);

            filtered.splice(newOrder, 0, task);

            const update = filtered.map((t, index) => {
                t.order = index;
                return t;
            });

            return this.repo.save(update);
        }

        const fromTasks = await this.repo.find({
            where: { column: { id: fromColumnId } },
            order: { order: "ASC" },
        });

        const newFromTasks = fromTasks
        .filter((t) => t.id !== taskId)
        .map((t, index) => {
            t.order = index;
            return t;
        });

        const toTasks = await this.repo.find({
            where: { column: { id: toColumnId } },
            order: { order: "ASC" },
        });

        task.column = { id: toColumnId } as any;

        const newToTasks = [...toTasks];
        newToTasks.splice(newOrder, 0, task);

        const reorderedTo = newToTasks.map((t, index) => {
            t.order = index;
            return t;
        });

        await this.repo.save(newFromTasks);
        return this.repo.save(reorderedTo);
    }

    async delete(id: string) {
        return this.repo.delete(id);
    }
}