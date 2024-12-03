import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  // Put,
  Response,
} from '@nestjs/common';
import {
  ApiResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/response-kit';
import { ValidationPipe } from 'src/shared/utils/validation.pipe';
import { IFormModel } from './domain';
import { CreateFormDto } from './dto/request/create-form.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async createForm(
    @Body(new ValidationPipe()) createFormDto: CreateFormDto,
    @Response() res,
  ) {
    try {
      const response = (await this.formService.create(
        createFormDto,
      )) as SuccessResponseType<IFormModel>;

      if (!response.success) {
        throw response.error;
      }
      ApiResponse.success(res, response, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      } as ErrorResponseType);
    }
  }

  @Get()
  async getForm(
    @Response() res,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    const filters = {
      page,
      limit,
      searchTerm: search,
      sort: sortBy,
    } as any;
    const response = (await this.formService.findAll(
      filters,
    )) as SuccessResponseType<IFormModel>;

    if (!response.success) {
      throw response.error;
    }

    ApiResponse.success(res, response, 201);
  }

  @Get(':id')
  async getFormById(@Param('id') id: string, @Response() res) {
    try {
      const response = (await this.formService.findOne({
        _id: id,
      })) as SuccessResponseType<IFormModel>;

      ApiResponse.success(res, response, 200);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      } as ErrorResponseType);
    }
  }

  @Put(':id')
  async updateFprm(@Param('id') id: string, @Body() body, @Response() res) {
    const response = (await this.formService.update(
      {
        _id: id,
      },
      body,
    )) as SuccessResponseType<IFormModel>;

    if (!response.success) {
      throw response.error;
    }

    ApiResponse.success(res, response, 201);
  }

  @Delete(':id')
  async deleteForm(@Param('id') id: string) {
    const response = (await this.formService.delete({
      _id: id,
    })) as SuccessResponseType<IFormModel>;

    if (!response.success) {
      throw response.error;
    }

    return { success: true, message: 'Formulaire supprimer avec succes' };
  }

  // TODO modification du package repo-frameworkpour corriger la methode restoreById
  @Post(':id/restore')
  async restore(@Param('id') id: string, @Response() res) {
    const result = (await this.formService.restoreById(
      id,
    )) as SuccessResponseType<IFormModel>;

    if (!result.success) {
      throw result.error;
    }

    ApiResponse.success(res, result, 201);
  }
}
