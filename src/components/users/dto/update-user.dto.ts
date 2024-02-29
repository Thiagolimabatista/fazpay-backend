import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// PartialType - Avisa que os campos vindo de createUserDto são opcionais.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
