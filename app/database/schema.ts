import { integer, pgTable, text, varchar, boolean , date , timestamp } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    verified: boolean().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const sessionsTable = pgTable("sessions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull(),
    token: text('token'),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const noteInboxTable = pgTable("note_inbox" , {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull(),
    totalNotes: integer('total_notes').notNull(),
})

export const notesTable = pgTable("notes" , {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer('user_id').notNull(),
    inboxId: integer('inbox_id').notNull(),
    text: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})

export const sessionsRelations = relations(sessionsTable , ({ one }) => ({
    user: one(usersTable , {
        fields: [sessionsTable.userId],
        references: [usersTable.id]
    })
}))

export const noteInboxRelations = relations(noteInboxTable , ({ one , many }) => ({
    user: one(usersTable , {
        fields: [noteInboxTable.userId],
        references: [usersTable.id]
    }),
    notes: many(notesTable)
}))

export const notesRelations = relations(notesTable , ({ one }) => ({
    user: one(usersTable , { fields: [notesTable.userId] , references: [usersTable.id] }),
    inbox: one(noteInboxTable , { fields: [notesTable.inboxId] , references: [noteInboxTable.id] })
}))