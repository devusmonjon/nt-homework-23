"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();
  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
        .then((res) =>
          res.status === 200
            ? res.json()
            : (localStorage.removeItem("token"), router.push("/login"))
        )
        .then((data) => setUser(data))
        .catch((err) => {
          localStorage.removeItem("token");
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
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
        <div className="mt-10 mb-10">
          <h1 className="text-3xl font-medium mb-4">Logout</h1>
          <button
            className="p-2 bg-white text-black font-semibold text-[20px] border-white border-[2px] rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
