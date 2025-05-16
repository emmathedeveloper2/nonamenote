import { Route } from "./+types/route";
import {safeTry} from "~/utils";
import {Form, redirect, useNavigation} from "react-router";
import {ERRORS} from "~/types";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {useState} from "react";
import {getUserById} from "~/.server/bridges/users.bridge";
import {saveNote} from "~/.server/bridges/notes.bridge";
import {getUserNoteInbox} from "~/.server/bridges/note-inbox.bridge";
import Header from "~/components/header";

export async function loader({ params: { userId } } : Route.LoaderArgs) {

    const [ success , user , message ] = await safeTry(getUserById(parseInt(userId)))

    if(message == ERRORS.ACCOUNT_NOT_FOUND) return { user: undefined , inboxFull: false }

    const [ inboxSuccess , inbox , msg ] = await safeTry(getUserNoteInbox(parseInt(userId)))

    if(!inboxSuccess) return { success: false , message: msg }

    if(inbox.totalNotes >= 50) return { success: true , inboxFull: true }

    if(!success) return redirect('/error')

    return { user , inboxFull: false }
}

export async function action({ request , params } : Route.ActionArgs){

    const data = await request.formData()

    const userId = parseInt(params.userId)

    const [ success , user , message ] = await safeTry(getUserById(userId))

    if(!success) return {
        success: false,
        message
    }

    const [ noteSuccess , _ , msg2 ] = await safeTry(saveNote(userId , data.get('text') as string))

    if(!noteSuccess) return {
        success: false,
        message: msg2
    }

    return { success: true , message: 'Message sent successfully' }
}

export default function SendMessagePage({ loaderData , actionData } : Route.ComponentProps) {

    const { user , inboxFull } = loaderData

    const { state } = useNavigation()

    const isBusy = state != 'idle'

    if (!user) return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <h1 className={"text-xl md:text-5xl font-bold"}>Seem's like this link is broken</h1>
        </div>
    )

    if(inboxFull == true) return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <h1 className={"text-xl md:text-5xl font-bold"}>This note inbox is already full</h1>
        </div>
    )
    
    if(actionData && actionData.success) return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <h1 className={"text-xl md:text-5xl font-bold"}>Your note has been sent anonymously 👀</h1>
        </div>
    )

    const [textLength, setTextLength] = useState(0)

    return (
        <>
            <Header />
            <div className={"size-full flex flex-col items-center justify-center p-2"}>
                <Form method={'POST'} className={"w-full md:w-[600px] flex flex-col items-center gap-4"}>

                    <img src={'/logo.png'} className={"size-[100px]"}/>

                    {
                        actionData && !actionData.success &&
                        <div className={"w-full border-red-500 border text-red-500 p-4 bg-red-200 rounded flex items-center justify-center"}>
                            {actionData.message}
                        </div>
                    }

                    <h1 className={"text-xl md:text-5xl font-bold"}>
                        Send a note to {user.username}
                    </h1>

                    <Textarea
                        autoFocus
                        className={"resize-none"}
                        rows={5}
                        name={"text"}
                        onInput={e => setTextLength(e.currentTarget.value.trim().length)}
                    />

                    <p className={'w-full text-right'}>{textLength}/255</p>

                    <Button
                        disabled={(textLength == 0 || textLength > 255 || isBusy)}
                        className={"w-full"}
                    >
                        { isBusy ? "Sending..." : "Send Message"}
                    </Button>
                </Form>
            </div>
        </>
    )
}