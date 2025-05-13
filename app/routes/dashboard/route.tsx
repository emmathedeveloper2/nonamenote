import {safeTry} from "~/utils";
import {getCurrentUser, getNotes} from "~/.server";
import {redirect, useNavigation} from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import {Route} from "./+types/route";
import {LoaderIcon} from "lucide-react";
import CopyLinkCard from "~/components/copy-link-card";
import NotesContainer from "~/components/notes-container";

export async function loader({request}: Route.LoaderArgs) {

    const [success, user] = await safeTry(getCurrentUser(request.headers))

    if (!success) return redirect('/signup', {
        headers: {
            'Set-Cookie': await authCookie.serialize('', {maxAge: 1})
        }
    })

    if (!user.verified) return redirect('/choose-verification-method')

    const [noteSuccess, notes] = await safeTry(getNotes(user.id))

    if (!noteSuccess) return redirect('/error')

    return {user, notes, appUrl: request.url.slice(0, request.url.lastIndexOf('/'))}
}

export default function DashboardPage({loaderData}: Route.ComponentProps) {

    const {user, notes, appUrl} = loaderData

    const {state} = useNavigation()

    const isBusy = state != 'idle'

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>

            {
                isBusy ? <LoaderIcon className={"animate-spin"}/> :

                    <div className={"w-full min-h-full md:w-[600px] pt-8 md:pt-14 flex flex-col gap-4"}>
                        <h1 className={"text-xl md:text-5xl font-black"}>Welcome {user.username}</h1>

                        {
                            notes.length > 0 &&
                            <CopyLinkCard appUrl={appUrl} user={user}/>
                        }


                        {
                            notes.length < 1 ?
                                <CopyLinkCard noLink={true} appUrl={appUrl} user={user}/>
                                :
                                <>
                                    <NotesContainer notes={notes}/>
                                </>
                        }
                    </div>
            }
        </div>
    )
}