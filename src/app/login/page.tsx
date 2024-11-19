"use client";

import { Card, Button } from "antd";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = () => {
    // need to add a google login via firebase
    signIn("google", { callbackUrl: "/dashboard" });
    // take the email and create a user object
    // feed into prisma if its not there yet
    // redirect to dashboard
    // redirect("/dashboard")
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
          <p className="text-gray-600 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        <Button
          onClick={handleLogin}
          className="w-full h-12 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <span>Continue with Google</span>
        </Button>
      </Card>
    </div>
  );
}
