import { createContext, useContext } from "react";

export const defaultGlobalState = {
  key: "",
};
export const globalStateContext = createContext(defaultGlobalState);
export const dispatchStateContext = createContext(undefined);
export const useGlobalState = () => [
  useContext(globalStateContext),
  useContext(dispatchStateContext),
];
