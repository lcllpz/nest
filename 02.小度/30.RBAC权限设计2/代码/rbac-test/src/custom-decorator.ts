import { SetMetadata } from '@nestjs/common';

export const LoginRequired = () => SetMetadata('loginRequired', true);

export const PermissionRequired = (...permissions: string[]) =>
  SetMetadata('permissionRequired', permissions);
