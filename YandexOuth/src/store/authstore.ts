import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

import { AuthState, User, Role, permissions } from '../types/auth';

interface AuthActions {
  login: (code: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,

  login: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const clientId = 'd9ff50ec155f4aed98859bcf27710588';
      const clientSecret = 'b10b7fa90923436f8c60c9c2074d1c25';
      // Exchange authorization code for tokens
      /*
      const base64Credentials = btoa(`${clientId}:${clientSecret}`);
      const response = await axios.post(
        'https://oauth.yandex.ru/token',
        {
          grant_type: 'authorization_code',
          code: { code },
          client_id: 'd9ff50ec155f4aed98859bcf27710588',
          client_secret: 'b10b7fa90923436f8c60c9c2074d1c25',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Credentials}`,
          },
        },
      );
      */

      const base64Credentials = btoa(`${clientId}:${clientSecret}`);
      const body = new URLSearchParams();
      body.append('grant_type', 'authorization_code');
      body.append('code', code);
      body.append('client_id', clientId);
      body.append('client_secret', clientSecret);

      const response = await fetch('https://oauth.yandex.ru/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${base64Credentials}`,
        },
        body: body.toString(),
      });

      //if (!response.ok) {
      //  throw new Error('Network response was not ok');
      //}

      if (response.ok) {
        const data = await response.json();

        //const { access_token } = response.data;
        const { access_token } = data;

        // Get user info from Yandex
        const userInfo = await axios.get('https://login.yandex.ru/info', {
          headers: {
            Authorization: `OAuth ${access_token}`,
          },
        });

        // In a real app, you would send the token to your backend
        // to verify and get the user's role
        // This is a mock implementation - replace with your actual backend call
        /*
      const backendResponse = await axios.post('http://localhost:3000', {
        yandexToken: access_token,
      });
      */

        //Shame, KARL
        const backendToken = access_token; //backendResponse.data.token;
        //const decoded: { role: Role } & User = jwtDecode(backendToken);
        let role: Role = 'user';
        if (userInfo.data.login == 'Tauren81') {
          role = 'admin';
        }

        set({
          token: backendToken,
          user: {
            id: userInfo.data.id,
            name: userInfo.data.real_name || userInfo.data.login,
            email: userInfo.data.default_email,
            role: role, //decoded.role,
          },
          isAuthenticated: true,
          isLoading: false,
        });

        // Store token in localStorage
        localStorage.setItem('token', backendToken);
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set(initialState);
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      set({ isLoading: true });
      // Verify token with your backend
      const response = await axios.get('http://localhost:3000', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { xxx } = response.data;
      const yyy = xxx;
      //yyy = yyy + '';

      const decoded: { role: Role } & User = jwtDecode(token);
      set({
        token,
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      set(initialState);
    }
  },

  hasPermission: (permission: string) => {
    const { user } = get();
    if (!user) return false;

    const userPermissions = permissions[user.role];
    return userPermissions.includes(permission);
  },
}));
