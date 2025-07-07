import { IUser } from '@SharedRepo/interfaces/user.interface';

function filterSingleUserResponse(user: IUser): IUser {
  const { password, ...filteredUser } = user;
  return filteredUser;
}

export function filterUserResponse(user: IUser | IUser[]): IUser | IUser[] {
  if (Array.isArray(user)) {
    return user.map((u) => filterSingleUserResponse(u));
  }

  const { password, ...filteredUser } = user;
  return filteredUser;
}
