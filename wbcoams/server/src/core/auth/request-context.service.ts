import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { ExtendedRequest } from 'src/common/types/extended-request.type';

@Injectable({
  scope: Scope.REQUEST,
})
export class RequestContextService {
  constructor(@Inject(REQUEST) private readonly request: ExtendedRequest) {}

  get user() {
    return this.request.user;
  }

  get userId() {
    const userId = this.user.role === UserRole.CUSTOMER ? this.user.userId : this.user.id;
    return userId;
  }

  get userRole() {
    return this.user.role;
  }

  get userEmail() {
    return this.user.email;
  }

  get customerId() {
    return this.user.role === UserRole.CUSTOMER ? this.user.id : null;
  }

  isCustomer() {
    return this.userRole === UserRole.CUSTOMER;
  }

  isAdmin() {
    return this.userRole === UserRole.ADMIN;
  }

  isStaff() {
    return this.userRole === UserRole.STAFF;
  }

  isManager() {
    return this.userRole === UserRole.MANAGER;
  }

  isManagerOrAdmin() {
    return this.isManager() || this.isAdmin();
  }

  isManagerOrStaff() {
    return this.isManager() || this.isStaff();
  }

  isBackOfficeUser() {
    return this.isManagerOrAdmin() || this.isStaff();
  }
}
