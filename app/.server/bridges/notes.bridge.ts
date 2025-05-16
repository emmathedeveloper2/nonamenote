import db from "~/database";
import {noteInboxTable, notesTable} from "~/database/schema";
import {and, desc, eq} from "drizzle-orm";
import {ERRORS} from "~/types";


export const getNotes = async (userId: number) => {
    try {
        return await db.select().from(notesTable).where(eq(notesTable.userId , userId)).orderBy(desc(notesTable.createdAt))
    }catch (e) {
        throw e
    }
}

export const saveNote = async (userId: number , text: string) => {
    try {
        const [ inbox ] = await db.select().from(noteInboxTable).where(eq(noteInboxTable.userId , userId))

        if(!inbox) throw new Error(ERRORS.INBOX_NOT_FOUND)

        const [ note ] = await db.insert(notesTable).values({ inboxId: inbox.id , userId , text }).returning()

        await db.update(noteInboxTable).set({ totalNotes: inbox.totalNotes + 1 })
    }catch (e){
        throw e
    }
}

export const deleteNote = async (noteId: number , userId: number) => {

    try {

        console.log(noteId , userId)

        const [ inbox ] = await db.select().from(noteInboxTable).where(eq(noteInboxTable.userId , userId))

        if(!inbox) throw new Error(ERRORS.INBOX_NOT_FOUND)

        const [ note ] = await db.delete(notesTable).where(
            and(
                eq(notesTable.id , noteId),
                eq(notesTable.userId , userId),
            )
        ).returning()

        if(!note) throw new Error(ERRORS.UNAUTHORIZED_NOTE_DELETION)

        await db.update(noteInboxTable).set({ totalNotes: inbox.totalNotes-- }).where(eq(noteInboxTable.userId , userId))

    }catch (e){
        throw e
    }
}