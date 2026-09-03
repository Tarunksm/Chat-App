import auth from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function ChatPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  const username = session.user.name;
  return <main className="min-h-screen">{username}</main>;
}
