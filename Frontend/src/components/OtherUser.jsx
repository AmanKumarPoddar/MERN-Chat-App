import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../Redux/userSlice";
import { useSelector } from "react-redux";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers.includes(user._id);
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id
            ? "bg-zinc-400 text-black"
            : "text-white"
        } flex gap-2 items-center text-white hover:text-black hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""} `}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="Profile" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
    </>
  );
};

export default OtherUser;
