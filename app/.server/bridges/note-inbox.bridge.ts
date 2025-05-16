import db from "~/database";
import {noteInboxTable} from "~/database/schema";
import {eq} from "drizzle-orm";
import {ERRORS} from "~/types";


export const getUserNoteInbox = async (userId: number) => {

    try {
        const [ inbox ] = await db.select().from(noteInboxTable).where(eq(noteInboxTable.userId , userId))

        if(!inbox) throw new Error(ERRORS.INBOX_NOT_FOUND)

        return inbox
    } catch (e) {
        throw e
    }
}