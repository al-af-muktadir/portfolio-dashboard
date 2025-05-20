"use client";
import { ContextProvider } from "@/context/UserContext";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ContextProvider>{children}</ContextProvider>
    </Provider>
  );
};

export default Providers;
