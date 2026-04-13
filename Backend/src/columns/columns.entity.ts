import { Board } from "src/boards/boards.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ColumnEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @ManyToOne(() => Board, (board) => board.columns, 
    { onDelete: 'CASCADE' }
    )
    board: Board;
}