/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsJsonString, IsXmlString } from 'src/shared/validation';

class WorkflowDto {
  @IsXmlString({ message: 'The xml field must contain valid XML' })
  @IsOptional()
  xml: string;

  @IsJsonString({ message: 'The json field must contain valid JSON' })
  @IsOptional()
  json: string;
}

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ValidateNested()
  @Type(() => WorkflowDto)
  workflow: WorkflowDto;

  @IsString()
  //   @IsNotEmpty()
  group: string;

  @IsString()
  @IsEnum(["active", "inactive"], {
    message: 'Valid status required'
  })
  status: string;
}
