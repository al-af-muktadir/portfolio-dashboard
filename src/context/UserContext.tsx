/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getCurrentUser } from "@/services/Auth";
import { JwtPayload } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IUSer {
  email: string;
  exp: string;
  iat: string;
  role: string;
}
interface Value {
  user: JwtPayload | undefined | null | any | IUSer;
  setLoading: any;
  loading: boolean;
  refetchUser?: () => Promise<void>;
}

// interface Iuser {
//   email: string;
//   password: string;
// }
export const UserContext = createContext<Value | undefined | any>(undefined);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<JwtPayload | undefined | null | IUSer>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [loading]);

  return (
    <UserContext.Provider
      value={{ user, refetchUser: handleUser, setLoading, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);
  if (user === null) {
    throw new Error("Error");
  }
  return user;
};
