import { ColumnEntity } from "src/columns/columns.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    ownerId: string;

    @OneToMany(() => ColumnEntity, (column) => column.board)
    columns: ColumnEntity[];
}