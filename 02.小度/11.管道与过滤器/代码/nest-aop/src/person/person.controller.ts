import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  UseFilters,
  // UsePipes,
  // UseInterceptors,
  // UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AuthInterceptor } from 'src/auth.interceptor';
import { from } from 'rxjs';
import { MyExceptionFilter } from 'src/my-exception.filter';
// import { ValidatePipe } from 'src/validate.pipe';
// import { TimeoutInterceptor } from 'src/timeout.interceptor';
// import { PersonGuard } from './person.guard';

@Controller('person')
// @UseGuards(PersonGuard)
// @UseInterceptors(TimeoutInterceptor)
// @UsePipes(ParseIntPipe)
// @UseFilters(MyExceptionFilter)
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  // @UseGuards(PersonGuard)
  // @UseInterceptors(TimeoutInterceptor)
  findAll() {
    return 'person controller findAll';
  }

  @Get('name')
  @UseInterceptors(AuthInterceptor)
  findName() {
    console.log('---进入了 Controller findName ---');
    return from(['hello', 'worldA', 'abc']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  // @Delete(':id')
  // remove(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({
  //       exceptionFactory() {
  //         throw new HttpException('参数id错误', HttpStatus.NOT_ACCEPTABLE);
  //       },
  //     }),
  //   )
  //   id: string,
  // ) {
  //   return this.personService.remove(+id);
  // }

  @Delete(':id')
  @UseFilters(MyExceptionFilter)
  remove(
    @Param('id', ParseIntPipe)
    id: string,
  ) {
    return this.personService.remove(+id);
  }
}
