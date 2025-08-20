import { PartialType } from '@nestjs/mapped-types';
import { CreateFundationDto } from './create-fundation.dto';

export class UpdateFundationDto extends PartialType(CreateFundationDto) {}
