import { SetMetadata } from '@nestjs/common';

export const RequestRoles = (...roles: string[]) => SetMetadata('roles', roles);
