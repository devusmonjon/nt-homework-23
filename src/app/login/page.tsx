"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [token, setToken] = useState<string | null>("");
  const [username, setUsername] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && password) {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            router.push("/admin");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const router = useRouter();

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
          <h1 className="text-3xl font-medium mb-4">Login</h1>
          <form
            onSubmit={(e) => handleLogin(e)}
            className="flex flex-col w-[500px] gap-4"
          >
            <input
              type="username"
              placeholder="Enter your username"
              className="p-4 bg-transparent border-white border-[2px] rounded-lg outline-none"
              name="username"
              onChange={handleInput}
              value={username}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="p-4 bg-transparent border-white border-[2px] rounded-lg"
              name="password"
              onChange={handleInput}
              value={password}
            />
            <button className="p-2 bg-white text-black font-semibold text-[20px] border-white border-[2px] rounded-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
