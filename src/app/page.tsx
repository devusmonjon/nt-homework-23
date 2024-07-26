"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [token, setToken] = useState<string | null>("");

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.refresh();
  };

  useEffect(() => {
    setToken(localStorage.getItem("token") || null);
  }, []);

  return (
    <div>
      <div className="w-full h-screen fixed -z-10">
        <Image
          src="/bg.jpg"
          alt="bg"
          fill
          className="object-cover w-full h-full blur-2xl opacity-75"
        />
      </div>
      <div className="container">
        <div className="mt-10">
          <h1 className="text-3xl font-medium mb-4">HOME</h1>
          {token ? (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  router.push("/admin");
                }}
                className="px-8 py-4 bg-black rounded-lg border-white border-[2px]"
              >
                Admin
              </button>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="px-8 py-4 bg-black rounded-lg border-white border-[2px]"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="px-8 py-4 bg-black rounded-lg border-white border-[2px]"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
