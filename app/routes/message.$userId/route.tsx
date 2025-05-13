import { Route } from "./+types/route";
import {safeTry} from "~/utils";
import {getUserById, saveNote} from "~/.server";
import {Form, redirect, useNavigation} from "react-router";
import {ERRORS} from "~/types";
import {Button} from "~/components/ui/button";
import {Textarea} from "~/components/ui/textarea";
import {useState} from "react";

export async function loader({ params } : Route.LoaderArgs) {

    const [ success , user , message ] = await safeTry(getUserById(parseInt(params.userId)))

    if(message == ERRORS.ACCOUNT_NOT_FOUND) return { user: undefined }

    if(!success) return redirect('/error')

    return { user }
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

    const { user } = loaderData

    const { state } = useNavigation()

    const isBusy = state != 'idle'

    if(!user) return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <h1 className={"text-xl md:text-5xl font-bold"}>Seem's like this link is broken</h1>
        </div>
    )
    
    if(actionData && actionData.success) return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <h1 className={"text-xl md:text-5xl font-bold"}>Your note has been sent anonymously 👀</h1>
        </div>
    )

    const [textLength, setTextLength] = useState(0)

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <Form method={'POST'} className={"w-full md:w-[600px] flex flex-col gap-4"}>

                {
                    actionData && !actionData.success &&
                    <div className={"w-full border-red-500 border text-red-500 p-4 bg-red-200 rounded flex items-center justify-center"}>
                        {actionData.message}
                    </div>
                }

                <h1 className={"text-xl md:text-5xl font-bold"}>
                    Send a message to {user.username}
                </h1>

                <Textarea
                    autoFocus
                    className={"resize-none"}
                    rows={5}
                    name={"text"}
                    onInput={e => setTextLength(e.currentTarget.value.trim().length)}
                />

                <p className={'text-right'}>{textLength}/255</p>

                <Button
                    disabled={(textLength == 0 || textLength > 255 || isBusy)}
                >
                    { isBusy ? "Sending..." : "Send Message"}
                </Button>
            </Form>
        </div>
    )
}