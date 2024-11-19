"use client";

import { Avatar, Dropdown, MenuProps } from "antd";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>Signout</p>,
      onClick: () => signOut(),
    },
  ];

  return (
    <header className="flex justify-between items-center">
      <p className="text-2xl font-bold text-green-950">Reviewer</p>
      {session && (
        <Dropdown menu={{ items }} placement="bottomRight">
          <Avatar
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
            src={session.data?.user?.image}
          />
        </Dropdown>
      )}
    </header>
  );
};

export default Navbar;
