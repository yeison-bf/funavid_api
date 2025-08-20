import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartamentDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  description?: string;
}
