import { UserRole } from '../enums/user-role.enum';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName: string;
  roles: UserRole[];
}
