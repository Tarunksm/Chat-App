"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import authClient from "@/lib/auth-client";
import { socialLogin } from "./LoginForm";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const router = useRouter();

  const emailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== rePassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    setPasswordError("");
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (error) {
      setSignupError(error.message || "An error occured during Sign Up");
      return;
    }
    setSignupError("");
    router.push("/chat");
    router.refresh();
  };

  const googleLogin = socialLogin("google");

  const githubLogin = socialLogin("github");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md lg:max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-500">Join Chat App and start chatting</p>
        </div>
        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-center gap-4 rounded-lg border border-gray-300 px-4 py-3 font-bold text-gray-700 hover:bg-gray-50 transition "
            onClick={googleLogin}
            type="button"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
          <button
            className="w-full flex items-center justify-center gap-4 rounded-lg border border-gray-300 px-4 py-3 font-bold text-gray-700 hover:bg-gray-50 transition"
            onClick={githubLogin}
            type="button"
          >
            <FaGithub size={20} />
            Continue with GitHub
          </button>
        </div>
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-400" />
          <span className="text-sm text-gray-700">OR</span>
          <div className="h-px flex-1 bg-gray-400" />
        </div>
        <form onSubmit={emailSignup} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-md font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500 focus:ring-2 text-gray-800 focus:ring-gray-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-md font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-500 focus:ring-2 text-gray-800 focus:ring-gray-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-md font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rePassword"
              className="mb-1 block text-md font-semibold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="rePassword"
              type="password"
              placeholder="Re-enter your password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
          {signupError && <p className="text-sm text-red-500">{signupError}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-md text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-gray-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
