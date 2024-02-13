import { Request, Response } from 'express';
import {validatePassword} from "../service/user.service";
import {createSession} from "../service/session.service";
import config from "../config/default";
import {signJwt} from "../utills/jwt.utills";

export async function createUserSessionHandler(req:Request,res:Response){

    //validate user password
    const  user = await validatePassword(req.body);

    if(!user) {
        // @ts-ignore
        return res.status(401).send("Invalid username or password");
    }
    // create a session
    const session = await createSession(user._id, req.get('user-agent') || "");

    //create jwt token
    const accessToken = signJwt({...user,session: session._id},{expiresIn: config.accessTokenTtl}) //15 min for accessToken

    //create a refresh token
    const refreshToken = signJwt({...user,session: session._id},{expiresIn: config.accessTokenTtl}) //15 min for accessToken

    //send refresh and access token back
    return res.send({accessToken,refreshToken});

}