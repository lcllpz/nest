import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipePipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value.size > 10 * 1024) {
      console.log(value);
      throw new HttpException(
        '文件上传大小不能超过10K',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
