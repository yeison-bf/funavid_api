import { Departament } from 'src/module/departaments/entities/departament.entity';
import { Fundation } from 'src/module/fundations/entities/fundation.entity';
import { Role } from 'src/module/roles/entities/role.entity';
import { SubRole } from 'src/module/sub-role/entities/sub-role.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
} from 'typeorm';

export enum DocumentType {
    CC = 'CC', // Cédula de Ciudadanía
    TI = 'TI', // Tarjeta de Identidad
    CE = 'CE', // Cédula de Extranjería
    PP = 'PP', // Pasaporte
    RC = 'RC', // Registro Civil
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: DocumentType,
        nullable: false,
    })
    documentType: DocumentType;

    @Column({
        type: 'varchar',
        length: 20,
        unique: true,
        nullable: false,
    })
    documentNumber: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    lastName: string;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: false,
    })
    gender: Gender;

    @Column({
        type: 'text',
        nullable: false,
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    profession: string;

    @Column({
        type: 'date',
        nullable: false,
    })
    birthDate: Date;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true,
    })
    phone: string;

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive: boolean;

    // Relación 1:1 con Foundation
    @OneToOne(() => Fundation, (foundation) => foundation.users, {

        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn()
    foundation: Fundation;

    // Relación 1:1 con Department
    @OneToOne(() => Departament, (department) => department.users, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn()
    department: Departament;

    // Relación *:* con Roles
    @ManyToMany(() => Role, (role) => role.roles, {
        cascade: true,
    })

    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];

    // Relación *:* con Subroles
    @ManyToMany(() => SubRole, (subrole) => subrole.user, {
        cascade: true,
    })
    @JoinTable({
        name: 'user_subroles',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'subroleId',
            referencedColumnName: 'id',
        },
    })
    subroles: SubRole[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}