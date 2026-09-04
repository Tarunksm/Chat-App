import { LogoutButton } from "./LogoutButton";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-6 p-4">
      <h1 className="text-xl font-semibold text-gray-900">Chat App</h1>
      <LogoutButton />
    </nav>
  );
}
