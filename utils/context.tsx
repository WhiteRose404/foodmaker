import React from "react";

export interface ContextState {
  resto: any;
  items: any[],
  table: number
}

export interface ContextDispatch {
  setResto: React.Dispatch<React.SetStateAction<any>>;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  setTable: React.Dispatch<React.SetStateAction<number>>;
}

type ContextProps = ContextState & ContextDispatch;

const defaultState: ContextState = {
  resto: {},
  items: [],
  table: -1
};

const defaultDispatch: ContextDispatch = {
  setResto: () => {},
  setItems: () => {},
  setTable: () => {}
};

const defaultContext: ContextProps = {
  ...defaultState,
  ...defaultDispatch,
};

const AppContext = React.createContext<ContextProps>(defaultContext);

export default AppContext;