"use client";

// import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "./ui/theme-toggle";

const Header = () => {
  //   const { isAuth } = useAuth();

  return (
    <div className="w-full h-14 px-6 flex items-center justify-between border-b bg-card">
      {/* LEFT */}
      <div className="flex items-center">
        {/* Optional: logo / title here */}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* {isAuth ? <LogOut /> : <LoginButton />} */}
        <ModeToggle />
      </div>
    </div>
  );
};
export default Header;
