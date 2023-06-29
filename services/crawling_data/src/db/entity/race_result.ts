import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('race_result')
@Unique('constraint_unique', ['grand_prix', 'date', 'winner', 'car', 'laps'])
export class RaceResult {
    constructor(data?: Partial<RaceResult>) {
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    grand_prix: string;

    @Column({ nullable: false })
    date: Date;

    @Column({ nullable: false })
    winner: string;

    @Column({ nullable: false })
    car: string;
    
    @Column({ nullable: false })
    laps: number;

    @Column({ nullable: false })
    time: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}