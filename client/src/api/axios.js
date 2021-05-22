import axios from "axios";
import StorageService from "../components/storageService";
import { jwt } from "../constants/storageKeys";

export const axiosConfig = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
  timeout: 10000,
  withCredentials: true,
  
});

export const createTokenHeaders = () => {
    const token = StorageService.get(jwt);
    return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
    }
}

