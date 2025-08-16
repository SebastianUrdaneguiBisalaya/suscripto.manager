const SITE_URL = process.env.NODE_ENV === "production" ?
"https://suscriptomanager.vercel.app" : "http://localhost:3000";

export const config = {
    SITE_URL
};