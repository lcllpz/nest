import { FileValidator } from '@nestjs/common';

export class MyFileValidator extends FileValidator {
  constructor(options: Record<string, any>) {
    super(options);
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    if (file.size > 10 * 1024) {
      return false;
    } else if (file.mimetype !== 'image/jpeg') {
      return false;
    }
    return true;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    if (file.size > 10 * 1024) {
      return `文件 --- ${file.originalname} --- 太大,超出10K`;
    } else if (file.mimetype !== 'image/jpeg') {
      return `文件 --- ${file.originalname} --- 类型不正确,只能上传jpeg图片`;
    }
  }
}
// export declare abstract class FileValidator<TValidationOptions = Record<string, any>, TFile extends IFile = IFile> {
//   protected readonly validationOptions: TValidationOptions;
//   constructor(validationOptions: TValidationOptions);
//   /**
//    * Indicates if this file should be considered valid, according to the options passed in the constructor.
//    * @param file the file from the request object
//    */
//   abstract isValid(file?: TFile | TFile[] | Record<string, TFile[]>): boolean | Promise<boolean>;
//   /**
//    * Builds an error message in case the validation fails.
//    * @param file the file from the request object
//    */
//   abstract buildErrorMessage(file: any): string;
// }