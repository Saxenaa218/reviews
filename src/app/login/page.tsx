"use client";

import LoginWithGoogleBtn from "@/components/LoginWithGoogleBtn";
import { Card } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const session = useSession();
  const { push } = useRouter();

  if (session.status === "authenticated") return push("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
          <p className="text-gray-600 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        <LoginWithGoogleBtn />
      </Card>
    </div>
  );
};

export default LoginPage;
