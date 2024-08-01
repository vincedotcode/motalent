import { useUserStore, getUser, getToken } from '@/hooks/userStore'; // adjust the import path as needed

export const useAuth = () => {
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  return {
    setUser,
    getUser,
    getToken,
    logout,
  };
};
