import {notesTable, usersTable} from "~/database/schema";
import {Dispatch, SetStateAction} from "react";

export type UserType = typeof usersTable.$inferSelect

export type NoteType = typeof notesTable.$inferSelect

export interface CopyLinkCardProps {
    user: UserType
    link: string
}

export interface NotesContainerProps {
    notes: (NoteType)[]
}

export interface NoteComponentProps {
    note: NoteType
}

export interface HeaderProps {
    user?: UserType,
    link?: string
}

export interface ThemeContextProps {
    theme: string,
    setTheme: (theme: string) => void,
    isDark: boolean
    setIsDark: (isDark: boolean) => void,
}