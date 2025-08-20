import {
  IsEmail,
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsInt,
  IsArray,
  IsPhoneNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { DocumentType, Gender } from '../entities/user.entity';

export class CreateUserDto {
  @IsEnum(DocumentType, { message: 'El tipo de documento debe ser CC, TI, CE, PP o RC' })
  @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
  documentType: DocumentType;

  @IsString({ message: 'El número de documento debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  @MinLength(5, { message: 'El número de documento debe tener al menos 5 caracteres' })
  @MaxLength(20, { message: 'El número de documento no puede tener más de 20 caracteres' })
  @Matches(/^[0-9]+$/, { message: 'El número de documento solo puede contener números' })
  documentNumber: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El apellido no puede tener más de 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @IsEnum(Gender, { message: 'El género debe ser MALE, FEMALE u OTHER' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  gender: Gender;

  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MinLength(10, { message: 'La dirección debe tener al menos 10 caracteres' })
  @Transform(({ value }) => value?.trim())
  address: string;

  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial',
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'La profesión debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La profesión no puede tener más de 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  profession?: string;

  @IsDateString({}, { message: 'La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  birthDate: string;

  @IsOptional()
  @IsPhoneNumber('CO', { message: 'El número de teléfono debe ser válido para Colombia' })
  phone?: string;

  @IsOptional()
  @IsInt({ message: 'foundationId debe ser un número entero' })
  foundationId?: number;

  @IsOptional()
  @IsInt({ message: 'departmentId debe ser un número entero' })
  departmentId?: number;

  @IsOptional()
  @IsArray({ message: 'Los roles deben ser un arreglo' })
  @IsInt({ each: true, message: 'Cada roleId debe ser un número entero' })
  roleIds?: number[];

  @IsOptional()
  @IsArray({ message: 'Los subroles deben ser un arreglo' })
  @IsInt({ each: true, message: 'Cada subroleId debe ser un número entero' })
  subroleIds?: number[];
}
