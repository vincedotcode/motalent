import create from 'zustand';

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  dateOfBirth: string;
  country: string;
  isVerified: boolean;
  role: string;
  openForWork: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: UserData | null;
  token: string | null;
  setUser: (user: UserData, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,

  setUser: (user: UserData, token: string) => {
    set({ user, token });
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
  },

  logout: () => {
    set({ user: null, token: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
}));

// Helper functions to get user and token from the store
export const getUser = (): UserData | null => {
  return useUserStore.getState().user;
};

export const getToken = (): string | null => {
  return useUserStore.getState().token;
};

// Initialize the store with values from localStorage if they exist
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  if (storedUser && storedToken) {
    useUserStore.setState({
      user: JSON.parse(storedUser),
      token: storedToken,
    });
  }
}
