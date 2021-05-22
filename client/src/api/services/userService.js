import StorageService from "../../components/storageService";
import { currentUser, jwt } from "../../constants/storageKeys";
import { axiosConfig as axios } from "./../axios";

export const login = async (credentials) => {

  try {
    const { data } = await axios.post("/auth/login", credentials, { withCredentials: true });
    StorageService.set(currentUser, data.data);
    StorageService.set(jwt, data.token);
    return {
      data,
    };
  } catch (error) {
    StorageService.clear();
    console.error(error);
    return {
      error: error.response?.data.message || error.message,
    };
  }
};

export const signup = async (userDetails) => {
  try {
    const { data } = await axios.post("/auth/signup", userDetails);
    StorageService.set(currentUser, data.data);
    StorageService.set(jwt, data.token);
    return {
      data,
    };
  } catch (error) {
    console.error(error);
    StorageService.clear();
    return {
      error: error.response?.data.message || error.message,
    };
  }
};

// export const logout = async () => {
//   try {
//     const config = createTokenHeaders();
//     await axios.post("/auth/logout", null, config);
//     StorageService.remove(currentUser);
//     StorageService.remove(jwt);
//     return {
//       success: true,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       error: error.response?.data.message || error.message,
//     };
//   }
// };

export const logout = () => {
 StorageService.clear();
}