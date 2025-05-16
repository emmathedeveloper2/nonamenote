
export type Success<T> = [ true , T , string ]

export type Failure<E = Error> = [ false , E , string ]

export type Result<T , E> = Success<T> | Failure<E>

export enum ERRORS {
    ACCOUNT_NOT_FOUND = 'Account not found',
    INCORRECT_PASSWORD = 'Incorrect password',
    SESSION_NOT_FOUND = 'Session not found',
    EMAIL_TAKEN = 'Email Taken',
    USER_CREATION_ERROR = "Couldn't create your account",
    SESSION_CREATION_ERROR = "Couldn't create a session",
    INBOX_NOT_FOUND = "Couldn't Find the note inbox",
    UNAUTHORIZED_NOTE_DELETION = "You aren't allowed access to this note as you aren't the owner or the note doesn't exist"
}