import jwt from 'jsonwebtoken'
import {JWT_EXPIRES_IN, JWT_SECRET} from "~/.server/config/env.config";

export const generateSessionToken = () => {
    let code = ""

    for(let i = 0; i < 6; i++){
        code += Math.floor(Math.random() * 9).toString()
    }

    const signedToken = jwt.sign({ code } , JWT_SECRET as any , { expiresIn: JWT_EXPIRES_IN as any })

    return {
        signedToken,
        unsignedToken: code
    }
}