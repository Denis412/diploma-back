import { SetMetadata } from '@nestjs/common';

export const PublicRequest = () => SetMetadata('isPublic', true);
