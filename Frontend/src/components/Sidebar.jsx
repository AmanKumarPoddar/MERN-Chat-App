import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../Redux/userSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const { otherUsers } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/logout"
      );

      if (socket) {
        socket.disconnect();
      }

      navigate("/login");
      toast.success(response.data.Message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const chatUser = otherUsers.find((user) => {
      return user.fullName.toLowerCase().includes(search.toLowerCase());
    });

    if (chatUser) {
      // Filter out the found user from the original array
      const remainingUsers = otherUsers.filter((user) => user !== chatUser);

      // Set the otherUsers state with the found user at the 0th index followed by the remaining users
      dispatch(setOtherUsers([chatUser, ...remainingUsers]));
    } else {
      toast.error("User not found!");
      setOtherUsers(otherUsers);
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
          className="input input-bordered rounded-md"
        />
        <button type="submit" className="btn  bg-zinc-500 text-white">
          <FaSearch className="h-6 w-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
