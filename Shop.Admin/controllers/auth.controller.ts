import { NextFunction, Request, Response, Router } from "express";
import { throwServerError } from "./helper";
import { IAuthRequisites } from "@Shared/types";
import { verifyRequisites } from "../models/auth.model";


export const authRouter = Router();

authRouter.get("/login", async (req: Request, res: Response) => {
    try {
        res.render("login");
    } catch (e) {
        throwServerError(res, e);
    }
});

authRouter.post("/authenticate", async (
    req: Request<{}, {}, IAuthRequisites>,
    res: Response
) => {
    try {
        const verified = await verifyRequisites(req.body);

        console.log('req.body=', req.body);
        console.log('verified=', verified);

        if (verified) {
            res.redirect(`/${process.env.ADMIN_PATH}`)
        } else {
            res.redirect(`/${process.env.ADMIN_PATH}/auth/login`);
        }
    } catch (e) {
        throwServerError(res, e);
    }
});