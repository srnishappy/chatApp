import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogin: false,
  isUpdateProfile: false,
  isCheckAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log('Error in CheckAuth', error);

      set({ authUser: null });
    } finally {
      set({ isCheckAuth: false });
    }
  },
  signup: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      toast.success('Account created successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isSigninUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logout successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  },
  login: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Login successfully!');
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLogin: false });
    }
  },
}));
