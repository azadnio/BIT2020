import ISystemUser from '@intefaces/system-user';

export default class SystemUser implements ISystemUser {
  Name!: string;
  Role!: number;
  Email!: string;
  Password!: string;
  Status!: number;
  Id!: number;
  CreatedBy?: number | undefined;
  CreatedAt?: Date;
  UpdatedBy?: number | undefined;
  UpdatedAt?: Date | undefined;

  constructor(data: ISystemUser) {
    this.Name = data.Name;
    this.Role = data.Role;
    this.Email = data.Email;
    this.Password = data.Password;
    this.Status = data.Status;
    this.Id = data.Id;
    this.CreatedBy = data.CreatedBy;
    this.CreatedAt = data.CreatedAt;
    this.UpdatedAt = data.UpdatedAt;
    this.UpdatedBy = data.UpdatedBy;
  }
}
