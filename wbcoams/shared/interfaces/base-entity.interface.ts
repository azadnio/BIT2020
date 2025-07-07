export interface IBaseEntity {
  id?: number; // Unique identifier for the entity
  createdAt: Date; // Timestamp when the entity was created
  createdUserId: number; // Identifier for the user who created the entity
  updatedAt: Date; // Timestamp when the entity was last updated
  updatedUserId: number; // Identifier for the user who last updated the entity
  isActive: boolean; // Indicates if the entity is active or soft-deleted
}
