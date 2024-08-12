import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);
  console.log("Sender ID:", message?.senderId);
  console.log("Auth User ID:", authUser?.userId);
  console.log("Selected User ID:", selectedUser?._id);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?.userId === message?.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              message?.senderId === authUser?.userId
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">12:45</time>
      </div>
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
};

export default Message;
