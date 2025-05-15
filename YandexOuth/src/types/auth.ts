export type Role = 'admin' | 'editor' | 'user';

export const permissions: Record<Role, string[]> = {
  admin: ['create_post', 'delete_user', 'view_dashboard'],
  editor: ['create_post', 'view_dashboard'],
  user: ['view_dashboard'],
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
