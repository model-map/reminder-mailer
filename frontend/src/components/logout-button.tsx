"use client";
import { IAuthContext, useAuth } from "@/context/authContext";
import { Button } from "./ui/button";
import Cookies from "js-cookie";

const LogOutButton = () => {
  const { setUser, setIsAuth, setIsVerified } = useAuth() as Pick<
    IAuthContext,
    "setUser" | "setIsAuth" | "setIsVerified"
  >;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Clear cookies and reset auth states
    Cookies.remove("login_token");
    setUser(null);
    setIsAuth(false);
    setIsVerified(null);
  };
  return <Button onClick={handleClick}>Logout</Button>;
};
export default LogOutButton;
