import Link from "next/link";
import { Button } from "./ui/button";

const SignUpButton = () => {
  return (
    <Button>
      <Link href="/signup">Sign Up</Link>
    </Button>
  );
};
export default SignUpButton;
