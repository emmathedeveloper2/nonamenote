import {notesTable, usersTable} from "~/database/schema";

export interface CopyLinkCardProps {
    user: typeof usersTable.$inferSelect,
    appUrl: string,
    noLink?: boolean
}

export interface NotesContainerProps {
    notes: (typeof notesTable.$inferSelect)[]
}

export interface NoteComponentProps {
    note: typeof notesTable.$inferSelect
}