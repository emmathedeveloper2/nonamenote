import {noteInboxTable, sessionsTable, usersTable} from "~/database/schema";
import db from "~/database";
import {eq} from "drizzle-orm";
import {sendVerificationEmail} from "~/.server/config/email.config";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "~/.server/config/env.config";
import {safeTry} from "~/utils";
import {ERRORS} from "~/types";
import bcrypt, {genSalt, hash} from "bcryptjs";
import {generateSessionToken} from "~/.server/utils";
import { getCurrentSession } from "./users.bridge";

export const sendCode = async (session: typeof sessionsTable.$inferSelect , email: string) => {

    try {

        const { signedToken , unsignedToken } = generateSessionToken()

        const updatedSessions = await db.update(sessionsTable).set({ token: signedToken }).where(eq(sessionsTable.id , session.id)).returning()

        await sendVerificationEmail(email , unsignedToken)

        return updatedSessions[0]
    }catch (e){
        throw e
    }
}

export const verifyCode = async (headers: Headers , code: string) => {

    try {

        const session = await getCurrentSession(headers)

        const { code: expectedCode } = jwt.verify(session.token as string , JWT_SECRET!) as { code: string }

        if(code == expectedCode){

            const [ sessionSuccess , updatedSessions , msg1 ] = await safeTry(
                db.update(sessionsTable).set({ token: null }).where(eq(sessionsTable.id , session.id)).returning()
            )

            if(!sessionSuccess || updatedSessions.length < 1) throw new Error(msg1)

            const [ updatedUserSuccess , _ , msg2 ] = await safeTry(
                db.update(usersTable).set({ verified: true }).where(eq(usersTable.id , updatedSessions[0].userId)).returning()
            )

            if(!updatedUserSuccess) throw new Error(msg2)

            return updatedSessions[0]
        }else {
            throw new Error("Invalid code")
        }
    } catch (e){
        throw e
    }
}

export const signUpWithEmailAndPassword = async (username: string , email: string, password: string) => {

    try{

        const [ existingUser ] = await db.select().from(usersTable).where(eq(usersTable.email , email))

        if(existingUser) throw new Error(ERRORS.EMAIL_TAKEN)

        const salt = await genSalt(10)

        const hashed = await hash(password , salt)

        const [ user ] = await db.insert(usersTable).values({ username, email , password: hashed , verified: false }).returning()

        if(!user) throw new Error(ERRORS.USER_CREATION_ERROR)

        const [ session ] = await db.insert(sessionsTable).values({ userId: user.id , token: null }).returning()

        await db.insert(noteInboxTable).values({ userId: user.id , totalNotes: 0 }).returning()

        if(!session) throw new Error(ERRORS.SESSION_CREATION_ERROR)

        return session
    }catch (e) {
        throw e
    }
}

export const signInWithEmailAndPassword = async (email: string , password: string) => {
    try {
        //check that the user exists
        const [ user ] = await db.select().from(usersTable).where(eq(usersTable.email , email))

        if(!user) throw new Error(ERRORS.ACCOUNT_NOT_FOUND)

        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        if(!isPasswordCorrect) throw new Error(ERRORS.INCORRECT_PASSWORD)

        //get the users session

        const [ session ] = await db.select().from(sessionsTable).where(eq(sessionsTable.userId , user.id))

        if(!session) throw new Error(ERRORS.SESSION_NOT_FOUND)

        return session
    }catch (e) {
        throw e
    }
}