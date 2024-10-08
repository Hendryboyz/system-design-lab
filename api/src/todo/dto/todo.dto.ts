import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemId: string;
}

export class UpsertTodoDto extends UpdateTodoDto {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
