import { SignupForm } from "@/components/SignupForm";
import auth from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SignupPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/chat");
  }
  return <SignupForm />;
}
