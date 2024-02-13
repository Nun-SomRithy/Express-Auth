import jwt from 'jsonwebtoken'
import config from '../config/default';
import {readFileSync} from "fs";
import {resolve} from "path";

const publicKey= config.publicKey
const privateKey = config.privateKey
export function signJwt(object: Object, option?: jwt.SignOptions | undefined) {
    return jwt.sign(object,privateKey, {
        ...(object && option),
            algorithm: "RS256"
    });
}

export function verifyJwt(token: string) {

    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: true,
            decode: true,
        }
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decode: null,
        }
    }
}

