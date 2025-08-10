import axios from "axios";

const requester = axios.create({
    baseURL: process.env.NODE_ENV === "production" ?
    "https://suscripto.vercel.app/api" :
    "http://localhost:3000/api",
});

export default requester;