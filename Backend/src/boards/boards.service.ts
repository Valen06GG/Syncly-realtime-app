import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./boards.entity";
import { Repository } from "typeorm";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

    create(title: string, ownerId: string) {
        const board = this.boardsRepository.create({ 
            title, 
            ownerId 
        });

        return this.boardsRepository.save(board);
    }

    findAllByUser(userId: string) {
        return this.boardsRepository.find({
            where: { ownerId: userId },
        });
    }
}