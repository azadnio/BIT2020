export interface User {
  id: number;
  name: string;
  email: string;
  telephone?: string;
  address: string;
  address2?: string;
  city: string;
  nic: string;
  mobile: string;
  photo?: string;
  role: 'admin' | 'staff' | 'customer' | 'manager';
  isActive: boolean;
  createdAt: string;
  createdUserId: number;
  updatedUserId: number;
  updatedAt: string;
}

export interface Customer extends  User{
  id: number;
  userId: number;
  creditLimit: number;
  creditBalance: number;
  user?: User;
}
