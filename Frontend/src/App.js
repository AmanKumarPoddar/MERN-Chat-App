import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import { setOnlineUsers } from "./Redux/userSlice";
import { setSocket } from "./Redux/socketSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  console.log(socket);

  useEffect(() => {
    if (authUser) {
      const socketIo = io("http://localhost:8080", {
        query: {
          userId: authUser.userId,
        },
      });

      // Handle connection status correctly
      socketIo.on("connect", () => {
        console.log("Socket connected", socketIo.connected);
        dispatch(setSocket(socketIo)); // Set socket in Redux
      });

      socketIo.on("disconnect", () => {
        console.log("Socket disconnected", socketIo.connected);
        dispatch(setSocket(null)); // Clear socket in Redux
      });

      socketIo.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Clean up on unmount or when authUser changes
      return () => {
        socketIo.disconnect();
        dispatch(setSocket(null)); // Clear socket in Redux on cleanup
      };
    } else {
      // Handle disconnection when there's no authUser
      if (socket) {
        socket.disconnect();
        dispatch(setSocket(null)); // Clear socket in Redux
      }
    }
  }, [authUser, dispatch]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
