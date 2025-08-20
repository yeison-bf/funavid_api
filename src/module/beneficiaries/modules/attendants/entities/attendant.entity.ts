import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Beneficiary } from '../../../entities/beneficiary.entity';

export enum DocumentType {
  CC = 'CC',
  TI = 'TI',
  CE = 'CE',
  PP = 'PP',
  RC = 'RC',
}

@Entity('attendants')
export class Attendant {
  @PrimaryGeneratedColumn()
  id: number;

  // Tipo de documento
  @Column({
    type: 'enum',
    enum: DocumentType,
  })
  documentType: DocumentType;

  // Número de documento
  @Column({ length: 20 })
  documentNumber: string;

  // Nombres
  @Column({ length: 100 })
  firstName: string;

  // Apellidos
  @Column({ length: 100 })
  lastName: string;

  // Parentesco con el beneficiario
  @Column({ length: 50 })
  relationship: string;

  // Fecha de nacimiento
  @Column({ type: 'date' })
  birthDate: Date;

  // Teléfonos
  @Column({ length: 50 })
  phones: string;

  // Dirección
  @Column({ length: 200 })
  address: string;

  // Tipo de sangre
  @Column({ length: 5 })
  bloodType: string;

  // Correo de notificación (opcional)
  @Column({ nullable: true })
  notificationEmail?: string;

  // ¿Es el cuidador principal?
  @Column({ type: 'boolean', default: false })
  isCaregiver: boolean;

  // Relación con beneficiario
  @ManyToOne(() => Beneficiary, (beneficiary) => beneficiary.attendants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'beneficiary_id' })
  beneficiary: Beneficiary;
}
