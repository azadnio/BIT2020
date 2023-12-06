import { UserModel } from '../models/userModel';

export class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  registerUser(user: any): Promise<void> {
    return this.userModel.createUser(user);
  }

  getUserByEmail(email: string): Promise<any> {
    return this.userModel.getUserByEmail(email);
  }
}
