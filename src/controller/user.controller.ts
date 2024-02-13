import { Request, Response } from 'express';
import {createUser} from "../service/user.service";
import {CreateUserInput} from "../schema/user.schema";
import {omit} from "lodash";
 async function  createUserHandler(req: Request<{},{},CreateUserInput["body"]>, res: Response){
    try{
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), 'password'));
    }catch (error:any){
        res.status(409).send(error.message);
    }
}

export default createUserHandler;