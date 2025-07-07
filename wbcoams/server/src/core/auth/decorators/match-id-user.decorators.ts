import { SetMetadata } from '@nestjs/common';

export const MATCH_ID_USER_KEY = 'rolesRequiringIdMatch';
export const MatchIdUser = (...roles: string[]) => SetMetadata(MATCH_ID_USER_KEY, roles);
