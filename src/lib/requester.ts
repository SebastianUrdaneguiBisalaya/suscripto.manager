import axios from "axios";

const requester = axios.create({
    baseURL: process.env.NODE_ENV === "production" ?
    "https://suscriptomanager.vercel.app/api/data" :
    "http://localhost:3000/api/data",
});

export default requester;