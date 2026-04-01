import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  columnId: string;

  @IsNumber()
  order: number;
}