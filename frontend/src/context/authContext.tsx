"use client";
import { IUser } from "@/types/interfaces";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  isVerified: boolean | null;
  setIsVerified: Dispatch<SetStateAction<boolean | null>>;
  loading: boolean;
}

interface IAuthProvider {
  children: React.ReactNode;
}

// create context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// create provider
export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  //   Fetchh users

  useEffect(() => {
    async function fetchUser() {
      const token = Cookies.get("login_token");
      try {
        if (!token) return;
        const url = `${process.env.NEXT_PUBLIC_USER_SERVICE}/api/v1/user/me`;
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData: IUser = data.data.user;

        setUser(userData);
        setIsAuth(true);
        setIsVerified(userData.verified);
      } catch (error) {
        if (error instanceof AxiosError) {
          const message =
            error.response?.data?.error?.message ||
            error.message ||
            "Unknown error";
          toast.error(message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Internal server error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuth,
        setIsAuth,
        isVerified,
        setIsVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth custom hook can only be used within AuthContext");
  } else {
    return context;
  }
};
