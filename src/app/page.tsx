"use client";
import { useState } from "react";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    data: users,
    isFetching,
    isLoading,
    refetch: refetchUsers,
  } = trpc.getUsers.useQuery();

  const addUser = trpc.addUser.useMutation({
    onSuccess: () => {
      void refetchUsers();
    },
  });

  const handleClick = () => {
    addUser.mutate({
      name,
      email,
    });
  };

  if (isLoading || isFetching) {
    return (
      <div className="bg-slate-950 h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 text-white px-4 py-2">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-slate-950 h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 ">
        <div className="text-white flex flex-col gap-2">
          {users?.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="px-4 py-2 border border-white outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="px-4 py-2 border border-white outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="px-4 py-2 text-white border border-white"
            onClick={handleClick}
          >
            Agregar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
