import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    console.log("Auth User:", authUser);
    if (!authUser) {
      toast.error("User not authenticated");
      navigate("/login");
    }
  }, [authUser, navigate]);
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;
