"use client";

import authClient from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-gray-600 hover:text-gray-900"
    >
      Logout
    </button>
  );
}
