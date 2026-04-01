import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnEntity } from './columns.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([ColumnEntity]),
    ],
    controllers: [ColumnsController],
    providers: [ColumnsService],
})
export class ColumnsModule {}
