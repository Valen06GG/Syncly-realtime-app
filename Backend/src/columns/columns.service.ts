import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColumnEntity } from "./columns.entity";
import { Repository } from "typeorm";
import { CreateBoardDto } from "src/boards/dto/create-board.dto";
import { CreateColumnDto } from "./dto/create-column.dto";
import { BoardsService } from "src/boards/boards.service";

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(ColumnEntity)
        private repo: Repository<ColumnEntity>,
        private boardsService: BoardsService,
    ) {}   
    
    async create(dto: CreateColumnDto, userId: string) {
        const board = await this.boardsService.findOneByIdAndUser(dto.boardId, userId);

        const column = this.repo.create({
            title: dto.title,
            order: dto.order,
            board,
        });
        return this.repo.save(column);
    }

    findByBoard(boardId: string) {
        return this.repo.find({ 
            relations: ['board'],
            order: { order: 'ASC' },
        });
    }

    async findOne(id: string) {
      const column = await this.repo.findOne({
        where: { id },
      });
    
      if (!column) {
        throw new NotFoundException('Column not found');
      }
    
      return column;
    }

    async delete(id: string) {
        return this.repo.delete(id);
    }
}