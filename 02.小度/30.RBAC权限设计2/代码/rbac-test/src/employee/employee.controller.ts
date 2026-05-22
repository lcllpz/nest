import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { LoginRequired, PermissionRequired } from 'src/custom-decorator';

@Controller('employee')
@LoginRequired()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @PermissionRequired('新增 员工')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @PermissionRequired('查询 员工')
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @PermissionRequired('查询 员工')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  @PermissionRequired('更新 员工')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @PermissionRequired('删除 员工')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
