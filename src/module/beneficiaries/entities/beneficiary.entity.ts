import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Attendant } from '../modules/attendants/entities/attendant.entity';

export enum DocumentType {
  CC = 'CC', // Cédula de Ciudadanía
  TI = 'TI', // Tarjeta de Identidad
  CE = 'CE', // Cédula de Extranjería
  RC = 'RC', // Registro Civil
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity('beneficiaries')
export class Beneficiary {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Información personal básica
  @Column({ type: 'enum', enum: DocumentType })
  documentType: DocumentType;

  @Column({ type: 'varchar', length: 20, unique: true })
  documentNumber: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column({ type: 'varchar', length: 200 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  department: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  // Información sobre discapacidad
  @Column({ type: 'varchar', length: 100 })
  disabilityType: string;

  @Column({ type: 'varchar', length: 255 })
  disability: string;

  // Información familiar
  @Column({ type: 'int' })
  peopleLivingTogether: number;

  @Column({ type: 'varchar', length: 100 })
  placeOfBirth: string;

  @Column({ type: 'date' })
  documentIssueDate: Date;

  // Necesidades y diagnóstico
  @Column({ type: 'text' })
  mainNeed: string;

  @Column({ type: 'text' })
  diagnosis: string;

  @Column({ type: 'varchar', length: 100 })
  bloodType: string;

  @Column({ type: 'date' })
  diagnosisDate: Date;

  @Column({ type: 'varchar', length: 100 })
  diagnosisStage: string;

  // Información de salud y educación
  @Column({ type: 'varchar', length: 10 })
  socialStratum: string;

  @Column({ type: 'varchar', length: 100 })
  eps: string;

  @Column({ type: 'boolean' })
  isStudying: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  studyGrade: string;

  // Información financiera
  @Column({ type: 'varchar', length: 50, nullable: true })
  bankAccountNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthlyIncome: number;

  @Column({ type: 'boolean' })
  familyHasBusiness: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  businessName: string;

  // Otros datos
  @Column({ type: 'boolean' })
  hasFuneralService: boolean;

  @Column({ type: 'text' })
  childHobbies: string;

  @Column({ type: 'text' })
  childDreams: string;

  @Column({ type: 'varchar', length: 100 })
  childFavoriteArtist: string;

  @Column({ type: 'boolean' })
  familyHasTechDevices: boolean;

  @Column({ type: 'text', nullable: true })
  availableDevices: string;

  @Column({ type: 'boolean' })
  hasInternetAccess: boolean;

  // Estado adicional
  @Column({ type: 'text', nullable: true })
  observations: string;

  @Column({ type: 'date', nullable: true })
  dateOfDeath: Date;

  @Column({ type: 'boolean' })
  inWhatsappGroup: boolean;

  @Column({ type: 'boolean' })
  hasInterventionRecord: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => Attendant, (attendant) => attendant.beneficiary)
  attendants: Attendant[];
}
