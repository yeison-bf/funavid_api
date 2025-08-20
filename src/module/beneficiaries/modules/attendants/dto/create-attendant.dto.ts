import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEmail,
  IsBoolean,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { DocumentType } from '../entities/attendant.entity';

export class CreateAttendantDto {
  @IsEnum(DocumentType, { message: 'El tipo de documento no es válido' })
  documentType: DocumentType;

  @IsString()
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  @MaxLength(20)
  documentNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: 'El parentesco es obligatorio' })
  @MaxLength(50)
  relationship: string;

  @IsDateString({}, { message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD' })
  birthDate: string;

  @IsString()
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  @MaxLength(50)
  phones: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(200)
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de sangre es obligatorio' })
  @MaxLength(5)
  bloodType: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo de notificación debe tener un formato válido' })
  notificationEmail?: string;

  @IsBoolean({ message: 'Debe indicar si es cuidador principal' })
  isCaregiver: boolean;

  @IsNumber({}, { message: 'El ID del beneficiario debe ser un número' })
  @IsNotEmpty({ message: 'El ID del beneficiario es obligatorio' })
  beneficiaryId: number;
}
