import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../Redux/messageSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`
        );

        dispatch(setMessages(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default useGetMessages;
