"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.refresh();
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      fetch("https://dummyjson.com/users")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data.users);
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
        <table className="table-auto w-full border">
          <thead className="border-b">
            <tr className="text-left">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: any) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2">{user.firstName}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">{user.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Login;
