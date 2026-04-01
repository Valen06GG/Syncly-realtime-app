import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ColumnEntity } from "./columns.entity";
import { Repository } from "typeorm";
import { CreateBoardDto } from "src/boards/dto/create-board.dto";
import { CreateColumnDto } from "./dto/create-column.dto";

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(ColumnEntity)
        private repo: Repository<ColumnEntity>,
    ) {}   
    
    create(dto: CreateColumnDto) {
        const column = this.repo.create(dto);
        return this.repo.save(column);
    }

    findByBoard(boardId: string) {
        return this.repo.find({ 
            where: { boardId },
            order: { order: 'ASC' },
        });
    }

    async delete(id: string) {
        return this.repo.delete(id);
    }
}