/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ErrorResponseType, SuccessResponseType } from '@nodesandbox/response-kit';
import { IProcessModel } from './domain';
import { CreateProcessDto } from './dto';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  async createProcess(
    @Body(new ValidationPipe()) createProcessDto: CreateProcessDto,
    @Response() res,
  ) {
    try {
      const response = (await this.processService.create(
        createProcessDto,
      )) as SuccessResponseType<any>;

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
    const response = (await this.processService.findAll(
      filters,
    )) as SuccessResponseType<IProcessModel>;

    if (!response.success) {
      throw response.error;
    }

    ApiResponse.success(res, response, 201);
  }

  @Get(':id')
  async getFormById(@Param('id') id: string, @Response() res) {
    try {
      const response = (await this.processService.findOne({
        _id: id,
      })) as SuccessResponseType<IProcessModel>;

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
    const response = (await this.processService.update(
      {
        _id: id,
      },
      body,
    )) as SuccessResponseType<IProcessModel>;

    if (!response.success) {
      throw response.error;
    }

    ApiResponse.success(res, response, 201);
  }

  @Delete(':id')
  async deleteForm(@Param('id') id: string) {
    const response = (await this.processService.delete({
      _id: id,
    })) as SuccessResponseType<IProcessModel>;

    if (!response.success) {
      throw response.error;
    }

    return { success: true, message: 'Formulaire supprimer avec succes' };
  }

  // TODO modification du package repo-frameworkpour corriger la methode restoreById
  @Post(':id/restore')
  async restore(@Param('id') id: string, @Response() res) {
    const result = (await this.processService.restoreById(
      id,
    )) as SuccessResponseType<IProcessModel>;

    if (!result.success) {
      throw result.error;
    }

    ApiResponse.success(res, result, 201);
  }
}
