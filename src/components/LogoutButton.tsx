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
      className="rounded-lg border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white 
      transition hover:bg-gray-800"
    >
      Logout
    </button>
  );
}
