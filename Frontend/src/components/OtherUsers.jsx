import React from "react";
import OtherUser from "./OtherUser";
import { useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);

  if (!otherUsers) return; // This is called early return
  return (
    <div className="overflow-auto flex-1">
      {otherUsers?.map((otherUser) => {
        return <OtherUser key={otherUser._id} user={otherUser} />;
      })}
    </div>
  );
};

export default OtherUsers;
