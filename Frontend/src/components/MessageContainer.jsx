import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { setSelectedUser } from "../Redux/userSlice";

const MessageContainer = () => {
  const navigate = useNavigate();
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  useEffect(() => {
    if (!authUser) {
      toast.error("User not authenticated");
      navigate("/login"); // Correct path for redirection
    }
  }, [authUser, navigate]);

  // Early return if user is not authenticated
  if (!authUser) {
    return null; // Render nothing or a loading spinner if desired
  }

  const isOnline = selectedUser
    ? onlineUsers.includes(selectedUser._id)
    : false;
  // const isOnline = onlineUsers.includes(selectedUser._id);
  return (
    <>
      {selectedUser !== null ? (
        <div className="min-w-[550px] flex flex-col ">
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2 ">
            <div className={`avatar ${isOnline ? "online" : ""} `}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="Profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2 ">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="min-w-[550px] flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-white">
            Hi {authUser?.fullName}
          </h2>
          <h2 className="text-2xl text-white">Let's start a conversation!</h2>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
