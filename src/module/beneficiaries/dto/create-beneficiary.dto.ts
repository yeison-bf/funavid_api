import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsPositive,
  IsDecimal,
  MaxLength,
} from 'class-validator';
import { DocumentType, Gender } from '../entities/beneficiary.entity';

export class CreateBeneficiaryDto {
  // Información personal básica
  @IsEnum(DocumentType, { message: 'El tipo de documento no es válido' })
  documentType: DocumentType;

  @IsString({ message: 'El número de documento debe ser texto' })
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  @MaxLength(20)
  documentNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastName: string;

  @IsDateString({}, { message: 'La fecha de nacimiento debe ser válida (YYYY-MM-DD)' })
  birthDate: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'El departamento es obligatorio' })
  department: string;

  @IsEnum(Gender, { message: 'El género debe ser MALE, FEMALE u OTHER' })
  gender: Gender;

  // Información sobre discapacidad
  @IsString()
  @IsNotEmpty({ message: 'El tipo de discapacidad es obligatorio' })
  disabilityType: string;

  @IsString()
  @IsNotEmpty({ message: 'La discapacidad es obligatoria' })
  disability: string;

  // Información familiar
  @IsNumber()
  @IsPositive()
  peopleLivingTogether: number;

  @IsString()
  @IsNotEmpty({ message: 'El lugar de nacimiento es obligatorio' })
  placeOfBirth: string;

  @IsDateString({}, { message: 'La fecha de expedición debe ser válida (YYYY-MM-DD)' })
  documentIssueDate: string;

  // Necesidades y diagnóstico
  @IsString()
  @IsNotEmpty({ message: 'La necesidad principal es obligatoria' })
  mainNeed: string;

  @IsString()
  @IsNotEmpty({ message: 'El diagnóstico es obligatorio' })
  diagnosis: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de sangre es obligatorio' })
  bloodType: string;

  @IsDateString({}, { message: 'La fecha del diagnóstico debe ser válida (YYYY-MM-DD)' })
  diagnosisDate: string;

  @IsString()
  @IsNotEmpty({ message: 'La etapa del diagnóstico es obligatoria' })
  diagnosisStage: string;

  // Información de salud y educación
  @IsString()
  @IsNotEmpty({ message: 'El estrato es obligatorio' })
  socialStratum: string;

  @IsString()
  @IsNotEmpty({ message: 'La EPS es obligatoria' })
  eps: string;

  @IsBoolean({ message: 'Debe indicar si estudia' })
  isStudying: boolean;

  @IsOptional()
  @IsString()
  studyGrade?: string;

  // Información financiera
  @IsOptional()
  @IsString()
  bankAccountNumber?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El salario debe ser un número' })
  monthlyIncome?: number;

  @IsBoolean({ message: 'Debe indicar si la familia tiene emprendimiento' })
  familyHasBusiness: boolean;

  @IsOptional()
  @IsString()
  businessName?: string;

  // Otros datos
  @IsBoolean()
  hasFuneralService: boolean;

  @IsString()
  @IsNotEmpty({ message: 'Debe indicar los gustos del niño' })
  childHobbies: string;

  @IsString()
  @IsNotEmpty({ message: 'Debe indicar los sueños del niño' })
  childDreams: string;

  @IsString()
  @IsNotEmpty({ message: 'Debe indicar el artista favorito del niño' })
  childFavoriteArtist: string;

  @IsBoolean()
  familyHasTechDevices: boolean;

  @IsOptional()
  @IsString()
  availableDevices?: string;

  @IsBoolean()
  hasInternetAccess: boolean;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fallecimiento debe ser válida' })
  dateOfDeath?: string;

  @IsBoolean()
  inWhatsappGroup: boolean;

  @IsBoolean()
  hasInterventionRecord: boolean;
}
