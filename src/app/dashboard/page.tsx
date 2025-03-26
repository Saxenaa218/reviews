"use client";

import { useSession } from "next-auth/react";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import Topics from "@/components/Topics";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useUser } from "@/hooks/useUser";

const Dashboard = () => {
  const session = useSession();
  const { push } = useRouter();

  const { user } = useUser(session.data?.user?.email || "");

  if (session.status === "unauthenticated") {
    push("/login");
  }

  return (
    <div className="p-5">
      <NavBar />
      <p className="text-5xl font-bold">Welcome, {user?.name}!</p>
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold my-10">Topics</h3>
          <Button icon={<PlusOutlined />} onClick={() => push("/topic/create")}>
            Create Topic
          </Button>
        </div>
        <Topics />
      </section>
    </div>
  );
};

export default Dashboard;
