"use client";

import { Button } from "antd";
import { signIn } from "next-auth/react";

const LoginWithGoogleBtn = () => {
  const handleLogin = async () => {
    await signIn("google");
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-full h-12 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors"
    >
      <span>Continue with Google</span>
    </Button>
  );
};

export default LoginWithGoogleBtn;
