import express, {Express} from "express";
import createUserHandler from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {createUserSchema} from "./schema/user.schema";
import {createUserSessionHandler} from "./controller/session.controller";
import {createSessionSchema} from "./schema/session.schema";

function routes(app: Express){

    app.post('/api/users',validateResource(createUserSchema),createUserHandler);

    app.post(
        "/api/sessions",
        validateResource(createSessionSchema),
        createUserSessionHandler
    );

}
export default routes;
