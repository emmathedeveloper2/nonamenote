import db from "~/database";
import {sessionsTable, usersTable} from "~/database/schema";
import {eq} from "drizzle-orm";
import {ERRORS} from "~/types";
import {authCookie} from "~/.server/config/cookies.config";

export const createSession = async (userId: number, token: string | null) => {

    let data = {
        userId,
        token
    }

    return (await db.insert(sessionsTable).values(data).returning() as any as Array<typeof sessionsTable.$inferSelect>)[0]
}

export const createUser = async (data: typeof usersTable.$inferInsert) => {

    data.verified = false

    return (await db.insert(usersTable).values(data).returning() as any as Array<typeof usersTable.$inferSelect>)[0]
}

export const getUserByEmail = async (email: string) => {

    return (await db.select().from(usersTable).where(eq(usersTable.email , email)) as any as Array<typeof usersTable.$inferInsert>)[0]
}

export const getUserById = async (id: number) => {

    try {
        const users = await db.select().from(usersTable).where(eq(usersTable.id , id)) as any as Array<typeof usersTable.$inferInsert>

        if(!users[0]) throw new Error(ERRORS.ACCOUNT_NOT_FOUND)

        return users[0] as typeof usersTable.$inferSelect
    }catch (e) {
        throw e
    }
}

export const getCurrentUser = async (headers: Headers) => {

    try{
        const session = await getCurrentSession(headers)

        return await getUserById(session.userId)
    }catch (e) {
        throw e
    }
}

export const getCurrentSession = async (headers: Headers) => {
    try {
        const cookie = headers.get("Cookie")

        if(!cookie){
            let err = new Error()

            err.message = "Unauthorized"

            throw err
        }

        return (await authCookie.parse(cookie)) as typeof sessionsTable.$inferSelect
    }catch (e) {
        throw e
    }
}