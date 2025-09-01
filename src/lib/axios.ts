import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { client };
