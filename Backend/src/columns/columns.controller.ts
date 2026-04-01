import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ColumnsService } from "./columns.service";
import { CreateColumnDto } from "./dto/create-column.dto";

@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnsController {
    constructor(
        private readonly columnsService: ColumnsService
    ) {}

    @Post()
    create(@Body() dto: CreateColumnDto) {
        return this.columnsService.create(dto);
    }

    @Get(':boardId')
    findByBoard(@Param('boardId') boardId: string) {
        return this.columnsService.findByBoard(boardId);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.columnsService.delete(id);
    }
}