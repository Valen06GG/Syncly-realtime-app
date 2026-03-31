import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    boardId: string;

    @Column()
    order: number;
}