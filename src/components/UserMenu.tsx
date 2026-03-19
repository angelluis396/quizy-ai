"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import type { User } from "next-auth";

type Props = { user: Pick<User, "name" | "email" | "image"> };

export default function UserMenu({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        {user.image ? (
          <img src={user.image} alt={user.name ?? ""} className="w-9 h-9 rounded-full" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {user.name?.[0] ?? "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="font-semibold text-sm text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
