import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() dto: CreateBoardDto, @Request() req) {
    return this.boardsService.create(dto.title, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.boardsService.findAllByUser(req.user.userId);
  }
}