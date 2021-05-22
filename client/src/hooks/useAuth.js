import { useState, useEffect } from "react";
import { axiosConfig as axios} from "./../api/axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const findUser = async () => {
    try {
      const { data } = await axios.get("/auth/user", { withCredentials: true });
      setUser(data?.user);
      localStorage.setItem("currentUser", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      const message = error.response?.data.message || error.message;
      setError(message);
      localStorage.removeItem("currentUser");
    }
    setLoading(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  return {
    user,
    loading,
    error,
  };
};

export default useAuth;
