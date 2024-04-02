import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./src/lib/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
console.log(server);
  const socket = useMemo(() => io('https://socket-io-server-cxw8.onrender.com/', { withCredentials: true }), []);
  
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };