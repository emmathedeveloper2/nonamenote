import { getCurrentSession } from "~/.server/bridges/users.bridge";
import { Route } from "./+types/route";
import {safeTry} from "~/utils";
import {deleteNote} from "~/.server/bridges/notes.bridge";


export async function action({ request , params: { noteId } } : Route.ActionArgs){

    const [ success , session , msg1 ] = await safeTry(getCurrentSession(request.headers))

    if(!success) return { success , message: msg1 }

    const [ noteDeletedSuccess , _ , msg2 ] = await safeTry(deleteNote(parseInt(noteId) , session.userId))

    if(!noteDeletedSuccess) return {
        success: false,
        message: msg2
    }

    return {
        success: true,
        message: "Note deleted successfully"
    }
}