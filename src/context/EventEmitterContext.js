import { useContext, createContext } from "react";

export const EventEmitterContext = createContext(null);

export const useEventEmitter = () => {
  return useContext(EventEmitterContext);
}