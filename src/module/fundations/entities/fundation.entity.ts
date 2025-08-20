import { User } from 'src/module/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('fundations')
export class Fundation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nit: string;

    @Column({ name: 'business_name', type: 'varchar', length: 100 })
    businessName: string;

    @Column({ type: 'varchar', length: 200 })
    address: string;

    @Column({ type: 'varchar', length: 20 })
    phone: string;

    @Column({ type: 'varchar', length: 50 })
    city: string;

    @Column({ type: 'varchar', length: 50 })
    country: string;

    @Column({ type: 'varchar', length: 50 })
    department: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    logo: string;

    @Column({ type: 'varchar', length: 100 })
    program: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => User, (users) => users.foundation)
    users: User[];
}
