import { Controller, Get, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('init')
  async init() {
    await this.departmentService.init();
    return '初始化成功';
  }

  @Get()
  async findAll() {
    return await this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(id: number) {
    return await this.departmentService.findOne(id);
  }

  @Post()
  async create(department: CreateDepartmentDto) {
    return await this.departmentService.create(department);
  }
}
