"use client";

import { ReactNode } from "react"
import { useState, useEffect } from "react";
import AppContext from "@/utils/context";
import { ContextState, ContextDispatch } from "@/utils/context";


export function RestaurantProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData: any;
}) {
  const [state, setState] = useState<ContextState>({
    resto: initialData,
    items: [],
    table: -1,
  });

  // Sync with localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`restaurant_${initialData._id}`);
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, [initialData._id]);

  // Persist changes
  useEffect(() => {
    localStorage.setItem(`restaurant_${initialData._id}`, JSON.stringify(state));
  }, [state, initialData._id]);

  const contextValue: ContextState & ContextDispatch = {
    ...state,
    setResto: (resto: any) => setState((prev: any) => ({ ...prev, resto })),
    setItems: (items: any) => setState((prev: any) => ({ ...prev, items })),
    setTable: (table: any) => setState((prev: any) => ({ ...prev, table })),
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}