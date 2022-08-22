
import cookie from "cookie"; 


export default async function handler(req, res) {
    const { method } = req;

    if (method === "POST") {

            res.setHeader(
              "Set-Cookie",
              cookie.serialize("auth", "" , {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                expires: new Date(0),
                path: "/",
              })
            );
  
            res.status(200).json({ message: "Goodbye" });

    } else {
      res.json({ message: "Only POST requests are allowed" });
    }
  }