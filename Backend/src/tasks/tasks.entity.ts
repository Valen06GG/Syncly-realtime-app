import { ColumnEntity } from "src/columns/columns.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    order: number;

    @ManyToOne(() => ColumnEntity,{ onDelete: 'CASCADE', })
    column: ColumnEntity;
}