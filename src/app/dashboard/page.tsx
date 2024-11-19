"use client";

import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useSession, signIn } from "next-auth/react";
import NavBar from "@/components/NavBar";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-5">
      <NavBar />
      {session ? (
        <p className="text-5xl font-bold">Welcome, {session.user?.name}!</p>
      ) : (
        <Button
          type="primary"
          size="large"
          icon={<GoogleOutlined />}
          className="relative inline-flex items-center px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 overflow-hidden rounded-md transition-all duration-300 hover:opacity-90"
          onClick={() => signIn("google")}
        >
          <span className="relative">Login with Google</span>
        </Button>
      )}
    </div>
  );
}
