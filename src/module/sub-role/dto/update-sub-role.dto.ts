import { PartialType } from '@nestjs/mapped-types';
import { CreateSubRoleDto } from './create-sub-role.dto';

export class UpdateSubRoleDto extends PartialType(CreateSubRoleDto) {}
