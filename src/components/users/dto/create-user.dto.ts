import {
  IsString,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail(
    {},
    { message: 'O campo "email" deve ser um endereço de e-mail válido' },
  )
  email: string;

  @IsString()
  password?: string;

}
