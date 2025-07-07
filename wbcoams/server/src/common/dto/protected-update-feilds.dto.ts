import { Exclude } from 'class-transformer';

// This class is used to exclude certain fields from being updated in the database.
export class ProtectedUpdateFieldsDto {
  @Exclude()
  id?: string;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  createdUserId?: number;

  @Exclude()
  updatedUserId?: number;
}
