import { ICustomer } from '@SharedRepo/interfaces/customer.interface';

function filterSingleUserResponse(user: ICustomer): ICustomer {
  const { password, ...filteredUser } = user;
  return filteredUser;
}

export function filterCustomerResponse(user: ICustomer | ICustomer[]): ICustomer | ICustomer[] {
  if (Array.isArray(user)) {
    return user.map((u) => filterSingleUserResponse(u));
  }

  const { password, ...filteredUser } = user;
  return filteredUser;
}
