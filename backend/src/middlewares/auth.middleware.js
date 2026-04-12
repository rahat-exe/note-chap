import {auth} from '../auth.ts';
import { fromNodeHeaders } from "better-auth/node";

export async function verifySession(req,res,next){
    try {
        const session = await auth.api.getSession({
          headers: fromNodeHeaders(req.headers),
        });

        if(!session){
            return res
              .status(401)
              .json({ success: false, message: "Unarthorized" });
        }

        // console.log(session)

        req.user = session.user;
        req.sesson = session.session;

        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ success:false, message:"Unarthorized", error:error.message});       
    }
}