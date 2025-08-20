import { IsString } from 'class-validator';

export class CreateFundationDto {
  @IsString()
  nit: string;

  @IsString()
  businessName: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsString()
  department: string;

  @IsString()
  description: string;

  @IsString()
  logo: string;

  @IsString()
  program: string;
}
