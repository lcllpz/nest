import {
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';
import { FileValidationPipePipe } from './file-validation-pipe.pipe';
import { MyFileValidator } from './MyFileValidator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload1')
  // @UseInterceptors(FileInterceptor('file',{dest: './uploads'}))
  @UseInterceptors(FileInterceptor('file'))
  uploadFile1(
    @UploadedFile(
        new ParseFilePipe(
        //   {
        //   validators: [
        //     new MaxFileSizeValidator({ maxSize: 10 * 1024 }),
        //     new FileTypeValidator({ fileType: 'image/jpeg' }),
        //       自定义校验器
        //     // new MyFileValidator({}),
        //   ],
        // 这里触发过滤器的处理
        //   exceptionFactory: (err) => {
        //     throw new HttpException(
        //       '文件大小或者文件类型不正确，上传失败---' + err,
        //       400,
        //     );
        //   },
        // }
      )
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      message: '上传成功',
      file: file.filename,
    };
  }

  @Post('upload5')
  @UseInterceptors(FileInterceptor('file',{storage: storage}))
  uploadFile5(
    @UploadedFile(FileValidationPipePipe)
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      message: '上传成功',
      file: file.filename,
    };
  }

  @Post('upload2')
  @UseInterceptors(FilesInterceptor('files', 3))
  uploadFile2(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return {
      message: '上传成功',
      files,
    };
  }

  @Post('upload3')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files1', maxCount: 3 },
      { name: 'files2', maxCount: 3 },
    ],{dest: './uploads'}),
  )
  uploadFile3(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
  ) {
    console.log(files);
    return {
      message: '上传成功',
      files,
    };
  }

  @Post('upload4')
  @UseInterceptors(AnyFilesInterceptor({ storage: storage }))
  // @UseInterceptors(AnyFilesInterceptor())
  uploadFile4(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return {
      message: '上传成功',
      files,
    };
  }
}
