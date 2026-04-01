import { IsString, IsNumber } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  title: string;

  @IsString()
  boardId: string;

  @IsNumber()
  order: number;
}